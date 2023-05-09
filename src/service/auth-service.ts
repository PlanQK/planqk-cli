import {Config} from '@oclif/core/lib/config'
import UserConfig, {defaultBasePath} from '../model/user-config'
import {
  ServicePlatformApplicationsApi,
  ServicePlatformApplicationsApiApiKeys,
} from '../client/api/servicePlatformApplicationsApi'
import {HttpError} from '../client/api/apis'

export default class AuthService {
  applicationApi: ServicePlatformApplicationsApi

  constructor(config: Config, userConfig: UserConfig) {
    this.applicationApi = new ServicePlatformApplicationsApi()
    this.applicationApi.setApiKey(ServicePlatformApplicationsApiApiKeys.apiKey, userConfig.auth?.value as string)
    if (userConfig.endpoint) {
      this.applicationApi.basePath = userConfig.endpoint.basePath || defaultBasePath
      this.applicationApi.defaultHeaders = userConfig.endpoint.defaultHeaders || {}
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const payload = await this.applicationApi.getApplications()
      return (payload.response.statusCode! >= 200 && payload.response.statusCode! < 400)
    } catch (error) {
      if (error instanceof HttpError && error.statusCode === 401) {
        return false
      }

      throw new Error(`Internal error occurred, please contact your PlanQK administrator: ${error}`)
    }
  }
}
