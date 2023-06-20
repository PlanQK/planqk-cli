import {AuthenticatedCommand} from '../../model/command'
import Account from '../../model/account'
import * as inquirer from 'inquirer'
import {Args, ux} from '@oclif/core'
import PlanqkService from '../../service/planqk-service'

interface Context {
  id: string
  displayName: string
  isOrganization: boolean
}

export default class SetContext extends AuthenticatedCommand {
  planqkService!: PlanqkService

  static description = 'Set the current context, i.e., the personal or organization account you are currently working with.'

  static examples = [
    '$ planqk set-context',
    '$ planqk set-context <context-id>',
  ]

  static args = {
    contextId: Args.string(),
  }

  async init(): Promise<void> {
    await super.init()
    this.planqkService = new PlanqkService(this, this.config, this.userConfig)
  }

  async run(): Promise<void> {
    const {args} = await this.parse(SetContext)

    const contextId = args.contextId
    let selectedContext: Context | undefined

    if (!contextId) {
      ux.action.start('Loading available contexts')
    }

    const accounts: Account[] = await this.planqkService.getAccounts()

    if (!contextId) {
      ux.action.stop('Done')
    }

    if (contextId) {
      selectedContext = accounts.find(account => account.id === contextId)
    } else {
      const response = await inquirer.prompt({
        name: 'context',
        message: 'Choose a context',
        type: 'list',
        choices: this.getPromptOptions(accounts),
      })
      selectedContext = response.context
    }

    if (!selectedContext) {
      this.error(`Context with id "${contextId}" not found.`)
      this.exit()
    }

    const userConfig = {
      ...this.userConfig,
      context: selectedContext!,
    }
    this.userConfigService.writeUserConfig(this.config.configDir, userConfig)

    this.log(`Switched to context "${selectedContext?.displayName}".`)
  }

  getPromptOptions(accounts: Account[]): any[] {
    const options = []
    for (const account of accounts) {
      options.push({
        name: account.isOrganization ? `${account.displayName} (Organization)` : account.displayName,
        value: {id: account.id, displayName: account.displayName, isOrganization: account.isOrganization},
      })
    }

    return options
  }
}
