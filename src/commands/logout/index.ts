import {ux} from '@oclif/core'
import {AbstractCommand} from '../../model/command'

export default class Logout extends AbstractCommand {
  static description = 'Logout of the PlanQK Platform'

  static examples = [
    '$ planqk logout',
  ]

  async run(): Promise<void> {
    ux.action.start('Logout')
    this.userConfigService.writeUserConfig(this.config.configDir, {
      ...this.userConfig,
      auth: undefined,
      context: undefined,
    })
    ux.action.stop('successful')
  }
}
