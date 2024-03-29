import {Config} from '@oclif/core/lib/config'
import UserConfig, {defaultBasePath} from '../model/user-config'
import AuthPrincipal from '../model/auth-principal'
import {fetchOrThrow, PlanqkError} from '../helper/fetch'
import {debugEnabled} from '../helper/debug'

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
        if (error.response.status === 401) {
          throw new Error('Invalid API key')
        }

        const errorMessage = await error.getErrorMessage()
        throw new Error(errorMessage)
      }

      if (debugEnabled()) {
        console.error(JSON.stringify(error))
      }

      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }
}
