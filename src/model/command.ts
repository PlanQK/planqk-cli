import {Command} from '@oclif/core'
import {Config} from '@oclif/core/lib/config'
import UserConfig from './user-config'
import UserConfigService from '../service/user-config-service'
import AuthService from '../service/auth-service'

export abstract class AbstractCommand extends Command {
  userConfigService: UserConfigService
  userConfig: UserConfig

  constructor(argv: string[], config: Config) {
    super(argv, config)
    this.userConfigService = new UserConfigService()
    this.userConfig = this.userConfigService.readUserConfig(this.config.configDir)
  }
}

export abstract class AuthenticatedCommand extends AbstractCommand {
  async init(): Promise<void> {
    await super.init()

    if (!this.userConfig.auth) {
      throw new Error('No credentials provided. Use the "login" command to log-in.')
    }

    const auth = new AuthService(this.config, this.userConfig)
    const isAuthenticated = await auth.isAuthenticated()

    if (!isAuthenticated) {
      this.userConfigService.writeUserConfig(this.config.configDir, {...this.userConfig, auth: undefined})
      throw new Error('Invalid credentials provided. Use the "login" command to log-in.')
    }
  }
}
