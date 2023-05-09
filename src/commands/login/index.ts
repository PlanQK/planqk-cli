import {Flags, ux} from '@oclif/core'
import {AbstractCommand} from '../../model/command'
import AuthService from '../../service/auth-service'
import {AuthType} from '../../model/user-config'

export default class Login extends AbstractCommand {
  static description = 'Login with your PlanQK Platform credentials'

  static examples = [
    '$ planqk login -t <personal access token>',
  ]

  static flags = {
    help: Flags.help(),
    token: Flags.string({char: 't', description: 'Your personal access token', required: false}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Login)

    let token = flags.token
    if (!token) {
      token = await ux.prompt('What is your personal access token?', {type: 'mask'})
    }

    if (!token) {
      throw new Error('Invalid credentials. Please try again.')
    }

    ux.action.start('Login')

    const userConfig = {
      ...this.userConfig,
      auth: {
        type: AuthType.API_KEY,
        value: token,
      },
    }

    const auth = new AuthService(this.config, userConfig)
    const isAuthenticated = await auth.isAuthenticated()

    if (!isAuthenticated) {
      throw new Error('Invalid credentials. Please try again.')
    }

    this.userConfigService.writeUserConfig(this.config.configDir, userConfig)

    ux.action.stop('successful')
  }
}
