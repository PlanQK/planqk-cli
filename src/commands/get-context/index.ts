import {AuthenticatedCommand} from '../../model/command';
import {ux} from '@oclif/core';

export default class GetContext extends AuthenticatedCommand {
  static description = 'Get the current context, i.e. the personal or organization account you are currently working with.'

  static examples = [
    '$ planqk get-context',
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
