import {Command} from '@oclif/core'
import {Config} from '@oclif/core/lib/config'
import UserConfig, {defaultBasePath} from '../model/user-config'
import {CommandService} from './command-service'
import {ServicePlatformServicesApi, ServicePlatformServicesApiApiKeys} from '../client/api/servicePlatformServicesApi'
import {ServiceDto} from '../client/model/serviceDto'
import {BuildJobDto, ServiceDefinitionDto} from '../client/model/models'
import {HttpError} from '../client/api/apis'
import {ReadStream} from 'fs-extra'
import ManagedServiceConfig, {QuantumBackend} from '../model/managed-service-config'
import {ServicePlatformJobsApi, ServicePlatformJobsApiApiKeys} from '../client/api/servicePlatformJobsApi'
import {CreateJobRequest} from '../client/model/createJobRequest'
import {JobDto} from '../client/model/jobDto'
import Account from '../model/account'
import axios from 'axios'

export default class PlanqkService extends CommandService {
  serviceApi: ServicePlatformServicesApi
  jobApi: ServicePlatformJobsApi

  constructor(cmd: Command, config: Config, userConfig: UserConfig) {
    super(cmd, config, userConfig)
    this.serviceApi = new ServicePlatformServicesApi()
    this.serviceApi.setApiKey(ServicePlatformServicesApiApiKeys.apiKey, userConfig.auth?.value as string)
    this.jobApi = new ServicePlatformJobsApi()
    this.jobApi.setApiKey(ServicePlatformJobsApiApiKeys.apiKey, userConfig.auth?.value as string)
    if (userConfig.endpoint) {
      this.serviceApi.basePath = userConfig.endpoint.basePath || defaultBasePath
      this.serviceApi.defaultHeaders = userConfig.endpoint.defaultHeaders || {}
    }
  }

  async getServices(): Promise<ServiceDto[]> {
    try {
      const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
      const response = await this.serviceApi.getServices(undefined, organizationId)
      return response.body
    } catch (error) {
      if (error instanceof HttpError) {
        this.cmd.error(`Error getting services: ${error.response.statusCode} - ${error.response.statusMessage}`)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getService(id: string): Promise<ServiceDto> {
    try {
      const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
      const response = await this.serviceApi.getService(id, organizationId)
      return response.body
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.response.statusCode === 404) {
          this.cmd.error(`Service with id ${id} not found. Deploy your service by running 'planqk up'`)
        }

        this.cmd.error(`Error getting service: ${error.response.statusCode} - ${error.response.statusMessage}`)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async createService(serviceConfig: ManagedServiceConfig, userCode: ReadStream): Promise<ServiceDto> {
    const vCpuMilli = (serviceConfig.resources?.cpu || 1) * 1000
    const memoryMegabyte = (serviceConfig.resources?.memory || 2) * 1024

    let usePlatformToken: 'TRUE' | 'FALSE' | undefined = 'FALSE'
    if (serviceConfig.quantumBackend === QuantumBackend.IONQ) {
      usePlatformToken = 'TRUE'
    }

    try {
      const payload = await this.serviceApi.createManagedService(
        serviceConfig.name,
        serviceConfig.description,
        serviceConfig.quantumBackend,
        usePlatformToken,
        vCpuMilli,
        memoryMegabyte,
        serviceConfig.runtime,
        this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined,
        userCode,
        undefined,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      return payload.body
    } catch (error) {
      if (error instanceof HttpError) {
        this.cmd.error(`Error processing request: ${error.response.statusCode} - ${error.response.statusMessage}`)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async updateService(serviceId: string, userCode: ReadStream): Promise<ServiceDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      const {body: service} = await this.serviceApi.getService(serviceId, organizationId)
      const serviceDefinition = service && service.serviceDefinitions && service.serviceDefinitions[0]
      const payload = await this.serviceApi.updateSourceCode(serviceId, serviceDefinition!.id!, userCode, organizationId)
      return payload.body
    } catch (error) {
      if (error instanceof HttpError) {
        this.cmd.error(`Error processing request: ${error.response.statusCode} - ${error.response.statusMessage}`)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getBuildJob(service: ServiceDto, serviceDefinition: ServiceDefinitionDto): Promise<BuildJobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    const payload = await this.serviceApi.getBuildStatus(service.id!, serviceDefinition.id!, organizationId)
    return payload.body
  }

  async getBuildJobStatus(service: ServiceDto, serviceDefinition: ServiceDefinitionDto): Promise<BuildJobDto.StatusEnum | undefined> {
    const buildJob = await this.getBuildJob(service!, serviceDefinition!)
    return buildJob.status
  }

  async runJob(payload: CreateJobRequest): Promise<JobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    try {
      const response = await this.jobApi.createJob(payload, organizationId, {headers: {'X-Auth-Token': this.userConfig.auth!.value}})
      return response.body
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.statusCode === 404) {
          this.cmd.error(`Service you want to execute was not found in context ${this.userConfig.context?.displayName}. Are you in the correct context?`)
        }

        this.cmd.error(`Error creating job: ${error.response.statusCode} - ${error.response.statusMessage}`)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getJobById(id: string): Promise<JobDto> {
    const organizationId = this.userConfig.context?.isOrganization ? this.userConfig.context.id : undefined
    const response = await this.jobApi.getJobById(id, organizationId, {headers: {'X-Auth-Token': this.userConfig.auth!.value}})
    return response.body
  }

  async getAccounts(): Promise<Account[]> {
    try {
      const basePath = this.userConfig.endpoint?.basePath || defaultBasePath
      const payload = await axios
        .get(basePath + '/my/accounts', {headers: {'X-Auth-Token': this.userConfig.auth?.value}})
      return payload.data
    } catch {
      throw new Error('Failed fetching available user contexts.')
    }
  }
}
