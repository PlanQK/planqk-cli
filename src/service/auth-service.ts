import {Config} from '@oclif/core/lib/config'
import UserConfig, {defaultBasePath} from '../model/user-config'
import AuthPrincipal from '../model/auth-principal'

export default class AuthService {
  userConfig!: UserConfig

  constructor(config: Config, userConfig: UserConfig) {
    this.userConfig = userConfig
  }

  async authenticate(apiKey: string): Promise<AuthPrincipal> {
    try {
      const basePath = this.userConfig.endpoint?.basePath || defaultBasePath
      const payload = await fetch(basePath + '/authorize', {
        method: 'POST',
        headers: {'X-Auth-Token': apiKey},
      })
      return (await payload.json()) as AuthPrincipal
    } catch {
      throw new Error('Internal error occurred, please contact your PlanQK administrator')
    }
  }
}
