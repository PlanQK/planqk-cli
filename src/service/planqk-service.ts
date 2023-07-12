import {Command} from '@oclif/core'
import {Config} from '@oclif/core/lib/config'
import {CommandService} from './command-service'
import Account from '../model/account'
import UserConfig, {defaultBasePath} from '../model/user-config'
import ManagedServiceConfig, {QuantumBackend} from '../model/managed-service-config'
import {fetchOrThrow, getErrorMessage, PlanqkError} from '../helper/fetch'
import {
  BuildJobDto,
  Configuration,
  CpuConfiguration,
  CreateJobRequest,
  JobDto,
  MemoryConfiguration,
  ResponseError,
  ServiceDefinitionDto,
  ServiceDto,
  ServiceOverviewDto,
  ServicePlatformJobsApi,
  ServicePlatformServicesApi,
} from '../client'

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
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      return await this.serviceApi.getServices({xOrganizationId: organizationId})
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorMessage = await getErrorMessage(error.response)
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getService(id: string): Promise<ServiceDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      return await this.serviceApi.getService({id, xOrganizationId: organizationId})
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorMessage = await getErrorMessage(error.response)
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async createService(serviceConfig: ManagedServiceConfig, sourceCode: Blob, apiDefinition?: Blob): Promise<ServiceDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined

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
          xOrganizationId: organizationId,
          userCode: sourceCode,
          apiDefinition: apiDefinition,
        },
      )
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorMessage = await getErrorMessage(error.response)
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async updateService(serviceConfig: ManagedServiceConfig, sourceCode: Blob, apiDefinition?: Blob): Promise<ServiceDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    const service = await this.serviceApi.getService({id: serviceConfig.serviceId!, xOrganizationId: organizationId})
    const serviceDefinition = service && service.serviceDefinitions && service.serviceDefinitions[0]

    const milliCpus = (serviceConfig.resources?.cpu || 1) * 1000
    const cpuConfiguration: CpuConfiguration = {
      type: 'cpu',
      amount: milliCpus,
      unit: 'm',
    }

    const memoryInMegabytes = (serviceConfig.resources?.memory || 2) * 1024
    const memoryConfiguration: MemoryConfiguration = {
      type: 'memory',
      amount: memoryInMegabytes,
      unit: 'M',
    }

    // TODO: activate once latest qc-catalog is released
    // const gpuAccelerator = serviceConfig.resources?.gpu?.type || 'NONE'
    // const gpuCount = serviceConfig.resources?.gpu?.count || 0
    // const gpuConfiguration: GpuConfiguration = {
    //   type: 'gpu',
    //   amount: gpuCount,
    //   accelerator: gpuAccelerator,
    // }

    try {
      if (serviceConfig.description) {
        await this.serviceApi.updateServiceVersion({
          serviceId: service.id!,
          versionId: serviceDefinition!.id!,
          updateVersionRequest: {
            description: serviceConfig.description,
          },
          xOrganizationId: organizationId,
        })
      }

      await this.serviceApi.updateResourceConfiguration({
        serviceId: service.id!,
        versionId: serviceDefinition!.id!,
        updateResourceConfigurationRequest: cpuConfiguration,
        xOrganizationId: organizationId,
      })

      await this.serviceApi.updateResourceConfiguration({
        serviceId: service.id!,
        versionId: serviceDefinition!.id!,
        updateResourceConfigurationRequest: memoryConfiguration,
        xOrganizationId: organizationId,
      })

      // TODO: activate once latest qc-catalog is released
      // await this.serviceApi.updateResourceConfiguration({
      //   serviceId: service.id!,
      //   versionId: serviceDefinition!.id!,
      //   updateResourceConfigurationRequest: gpuConfiguration,
      //   xOrganizationId: organizationId,
      // })

      if (apiDefinition) {
        await this.serviceApi.updateApiDefinition({
          serviceId: service.id!,
          versionId: serviceDefinition!.id!,
          file: apiDefinition,
          xOrganizationId: organizationId,
        })
      }

      await this.serviceApi.updateSourceCode({
        serviceId: service.id!,
        versionId: serviceDefinition!.id!,
        sourceCode: sourceCode,
        xOrganizationId: organizationId,
      })
      return service
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorMessage = await getErrorMessage(error.response)
        throw new Error(errorMessage)
      }

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
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorMessage = await getErrorMessage(error.response)
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async runJob(payload: CreateJobRequest): Promise<JobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      return await this.jobApi.createJob({createJobRequest: payload, xOrganizationId: organizationId})
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorMessage = await getErrorMessage(error.response)
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getJobById(id: string): Promise<JobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      return await this.jobApi.getJob({id, xOrganizationId: organizationId})
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorMessage = await getErrorMessage(error.response)
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getAccounts(): Promise<Account[]> {
    const basePath = this.userConfig.endpoint?.basePath || defaultBasePath
    try {
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
