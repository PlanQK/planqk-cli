import {Flags, ux} from '@oclif/core'
import {AbstractCommand} from '../../model/command'
import AuthService from '../../service/auth-service'
import {AuthType} from '../../model/user-config'
import {writeUserConfig} from '../../service/user-config-service'

export default class Login extends AbstractCommand {
  static description = 'Login with your PlanQK Platform credentials'

  static examples = [
    '$ planqk login -t <personal access token>',
  ]

  static flags = {
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

    const auth = new AuthService(this.config, this.userConfig)
    const principal = await auth.authenticate(token)

    const userConfig = {
      ...this.userConfig,
      auth: {
        type: AuthType.API_KEY,
        value: token,
      },
      context: {
        id: principal.user.id,
        displayName: `${principal.user.firstName} ${principal.user.lastName}`,
        isOrganization: false,
      },
    }

    writeUserConfig(this.config.configDir, userConfig)

    ux.action.stop('successful')
  }
}
