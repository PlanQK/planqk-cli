import {Command} from '@oclif/core'
import {Config} from '@oclif/core/lib/config'
import {CommandService} from './command-service'
import Account from '../model/account'
import UserConfig, {defaultBasePath} from '../model/user-config'
import ManagedServiceConfig, {QuantumBackend} from '../model/managed-service-config'
import {
  BuildJobDto,
  Configuration,
  CreateJobRequest,
  JobDto,
  ServiceDefinitionDto,
  ServiceDto,
  ServiceOverviewDto,
  ServicePlatformJobsApi,
  ServicePlatformServicesApi,
} from '../client'
import {fetchOrThrow, PlanqkError} from '../helper/fetch'

export default class PlanqkService extends CommandService {
  serviceApi: ServicePlatformServicesApi
  jobApi: ServicePlatformJobsApi

  constructor(cmd: Command, config: Config, userConfig: UserConfig) {
    super(cmd, config, userConfig)

    const basePath = userConfig.endpoint?.basePath || defaultBasePath
    const defaultHeaders = userConfig.endpoint?.defaultHeaders || {}
    const apiKey = userConfig.auth?.value as string

    this.serviceApi = new ServicePlatformServicesApi(new Configuration({
      apiKey: apiKey,
      basePath: basePath,
      headers: defaultHeaders,
    }))
    this.jobApi = new ServicePlatformJobsApi(new Configuration({
      apiKey: apiKey,
      basePath: basePath,
      headers: defaultHeaders,
    }))
  }

  async getServices(): Promise<ServiceOverviewDto[]> {
    try {
      const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
      return await this.serviceApi.getServices({xOrganizationId: organizationId})
    } catch {
      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getService(id: string): Promise<ServiceDto> {
    try {
      const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
      return await this.serviceApi.getService({id, xOrganizationId: organizationId})
    } catch {
      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async createService(serviceConfig: ManagedServiceConfig, userCode: Blob): Promise<ServiceDto> {
    const milliCpus = (serviceConfig.resources?.cpu || 1) * 1000
    const memoryInMegabytes = (serviceConfig.resources?.memory || 2) * 1024

    const gpuAccelerator = serviceConfig.resources?.gpu?.type || 'NONE'
    const gpuCount = serviceConfig.resources?.gpu?.count || 0

    let usePlatformToken: 'TRUE' | 'FALSE' | undefined = 'FALSE'
    if (serviceConfig.quantumBackend === QuantumBackend.IONQ) {
      usePlatformToken = 'TRUE'
    }

    try {
      return await this.serviceApi.createManagedService({
          name: serviceConfig.name,
          description: serviceConfig.description,
          quantumBackend: serviceConfig.quantumBackend,
          usePlatformToken: usePlatformToken,
          milliCpus: milliCpus,
          memoryInMegabytes: memoryInMegabytes,
          runtime: serviceConfig.runtime,
          gpuCount: gpuCount,
          gpuAccelerator: gpuAccelerator,
          xOrganizationId: this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined,
          userCode: userCode,
        },
      )
    } catch {
      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async updateService(serviceId: string, userCode: Blob): Promise<ServiceDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      const service = await this.serviceApi.getService({id: serviceId, xOrganizationId: organizationId})
      const serviceDefinition = service && service.serviceDefinitions && service.serviceDefinitions[0]
      await this.serviceApi.updateSourceCode({
        serviceId: serviceId,
        versionId: serviceDefinition!.id!,
        sourceCode: userCode,
        xOrganizationId: organizationId,
      })
      return service
    } catch (error) {

      throw new Error('Internal error occurred, please contact your PlanQK administrator' + error)
    }
  }

  async getBuildJob(service: ServiceDto, serviceDefinition: ServiceDefinitionDto): Promise<BuildJobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      return await this.serviceApi.getBuildStatus({
        serviceId: service.id!,
        versionId: serviceDefinition.id!,
        xOrganizationId: organizationId,
      })
    } catch {
      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async runJob(payload: CreateJobRequest): Promise<JobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      return await this.jobApi.createJob({createJobRequest: payload, xOrganizationId: organizationId})
    } catch {
      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getJobById(id: string): Promise<JobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      return await this.jobApi.getJob({id, xOrganizationId: organizationId})
    } catch {
      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getAccounts(): Promise<Account[]> {
    try {
      const basePath = this.userConfig.endpoint?.basePath || defaultBasePath
      const response = await fetchOrThrow(basePath + '/my/accounts', {
        headers: {'X-Auth-Token': this.userConfig.auth!.value},
      })
      return (await response.json()) as Account[]
    } catch (error) {
      if (error instanceof PlanqkError) {
        const errorMessage = await error.getErrorMessage()
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }
}
