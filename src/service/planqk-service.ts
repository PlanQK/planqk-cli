import {Command} from '@oclif/core'
import {Config} from '@oclif/core/lib/config'
import UserConfig, {defaultBasePath} from '../model/user-config'
import {CommandService} from './command-service'
import {ServicePlatformServicesApi, ServicePlatformServicesApiApiKeys} from '../client/api/servicePlatformServicesApi'
import {ServiceDto} from '../client/model/serviceDto'
import {BuildJobDto, ServiceDefinitionDto} from '../client/model/models'
import {HttpError} from '../client/api/apis'
import {ReadStream} from 'fs-extra'
import ManagedServiceConfig from '../model/managed-service-config'
import axios from 'axios';
import {ServicePlatformJobsApi, ServicePlatformJobsApiApiKeys} from '../client/api/servicePlatformJobsApi';
import {CreateJobRequest} from '../client/model/createJobRequest';
import {JobDto} from '../client/model/jobDto';

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

  async getService(id: string): Promise<ServiceDto> {
    const response = await this.serviceApi.getService(id)
    return response.body
  }

  async createService(serviceConfig: ManagedServiceConfig, userCode: ReadStream): Promise<ServiceDto> {
    const vCpuMilli = (serviceConfig.resources?.cpu || 1) * 1000
    const memoryMegabyte = (serviceConfig.resources?.memory || 2) * 1024

    try {
      const payload = await this.serviceApi.createManagedService(
        serviceConfig.name,
        serviceConfig.description,
        serviceConfig.quantumBackend,
        'FALSE',
        vCpuMilli,
        memoryMegabyte,
        serviceConfig.runtime,
        undefined,
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
    try {
      const {body: service} = await this.serviceApi.getService(serviceId)
      const serviceDefinition = service && service.serviceDefinitions && service.serviceDefinitions[0]
      const payload = await this.serviceApi.updateSourceCode(serviceId, serviceDefinition!.id!, userCode)
      return payload.body
    } catch (error) {
      if (error instanceof HttpError) {
        this.cmd.error(`Error processing request: ${error.response.statusCode} - ${error.response.statusMessage}`)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getBuildJob(service: ServiceDto, serviceDefinition: ServiceDefinitionDto): Promise<BuildJobDto> {
    const payload = await this.serviceApi.getBuildStatus(service.id!, serviceDefinition.id!)
    return payload.body
  }

  async getBuildJobStatus(service: ServiceDto, serviceDefinition: ServiceDefinitionDto): Promise<BuildJobDto.StatusEnum | undefined> {
    const buildJob = await this.getBuildJob(service!, serviceDefinition!)
    return buildJob.status
  }

  async runJob(payload: CreateJobRequest): Promise<JobDto> {
    try {
      const response =  await this.jobApi.createJob(payload, undefined, {headers: {'X-Auth-Token': this.userConfig.auth!.value}})
      return response.body
    } catch (error) {
      if (error instanceof HttpError) {
        this.cmd.error(`Error creating job: ${error.response.statusCode} - ${error.response.statusMessage}`)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }

  async getJobById(id: string): Promise<JobDto> {
    const response = await this.jobApi.getJobById(id, undefined, {headers: {'X-Auth-Token': this.userConfig.auth!.value}})
    return response.body;
  }
}
