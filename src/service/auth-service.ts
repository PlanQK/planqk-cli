import {Config} from '@oclif/core/lib/config'
import UserConfig, {defaultBasePath} from '../model/user-config'
import axios, {AxiosError} from 'axios'
import AuthPrincipal from '../model/auth-principal'

export default class AuthService {
  userConfig!: UserConfig

  constructor(config: Config, userConfig: UserConfig) {
    this.userConfig = userConfig
  }

  async authenticate(apiKey: string): Promise<AuthPrincipal> {
    try {
      const basePath = this.userConfig.endpoint?.basePath || defaultBasePath
      const payload = await axios
        .post(basePath + '/authorize', undefined, {headers: {'X-Auth-Token': apiKey}})
      return payload.data
    } catch (error) {
      if (error instanceof AxiosError && error.status === 401) {
        throw new Error('Invalid credentials. Please try again.');
      }

      throw new Error(`Internal error occurred, please contact your PlanQK administrator: ${error}`)
    }
  }
}
