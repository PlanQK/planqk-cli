import {AuthenticatedCommand} from '../../model/command';
import Account from '../../model/account';
import * as inquirer from 'inquirer';
import {ux} from '@oclif/core';
import PlanqkService from '../../service/planqk-service';

export default class SetContext extends AuthenticatedCommand {
  planqkService!: PlanqkService

  static description = 'Set the current context, i.e. the personal or organization account you are currently working with.'

  static examples = [
    '$ planqk set-context ',
  ]

  async init(): Promise<void> {
    await super.init()
    this.planqkService = new PlanqkService(this, this.config, this.userConfig)
  }

  async run(): Promise<void> {
    ux.action.start('Loading available contexts')
    const accounts: Account[] = await this.planqkService.getAccounts()
    ux.action.stop('Done')

    const response = await inquirer.prompt({
      name: 'context',
      message: 'Choose a context',
      type: 'list',
      choices: this.getPromptOptions(accounts),
    })

    const userConfig = {
      ...this.userConfig,
      context: response.context,
    }
    this.userConfigService.writeUserConfig(this.config.configDir, userConfig)
  }

  getPromptOptions(accounts: Account[]): any[] {
    const options = [];
    for (const account of accounts) {
      options.push({
        name: account.isOrganization ? `${account.displayName} (Organization)` : account.displayName,
        value: {id: account.id, displayName: account.displayName, isOrganization: account.isOrganization},
      })
    }

    return options
  }
}
