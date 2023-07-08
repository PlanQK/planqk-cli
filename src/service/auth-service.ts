import {Config} from '@oclif/core/lib/config'
import UserConfig, {defaultBasePath} from '../model/user-config'
import AuthPrincipal from '../model/auth-principal'
import {fetchOrThrow, PlanqkError} from '../helper/fetch'

export default class AuthService {
  userConfig!: UserConfig

  constructor(config: Config, userConfig: UserConfig) {
    this.userConfig = userConfig
  }

  async authenticate(apiKey: string): Promise<AuthPrincipal> {
    try {
      const basePath = this.userConfig.endpoint?.basePath || defaultBasePath
      const response = await fetchOrThrow(basePath + '/authorize', {
        method: 'POST',
        headers: {'X-Auth-Token': apiKey},
      })
      return (await response.json()) as AuthPrincipal
    } catch (error) {
      if (error instanceof PlanqkError) {
        const errorMessage = await error.getErrorMessage()
        throw new Error(errorMessage)
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }
}
