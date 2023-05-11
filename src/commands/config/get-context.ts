import {AbstractCommand} from '../../model/command';
import {ux} from '@oclif/core';

export default class GetContext extends AbstractCommand {
  static description = 'Get the current context'

  static examples = [
    '$ planqk config:get-context',
  ]

  async init(): Promise<void> {
    await super.init()
  }

  async run(): Promise<void> {
    if (this.userConfig && this.userConfig.context) {
      const type = this.userConfig.context.isOrganization ? 'Organization' : 'Personal'
        ux.info(`${this.userConfig.context.displayName} (${type})`)
    } else {
      ux.info('No context set. Use the "config:set-context" command to set a context.')
    }
  }
}
