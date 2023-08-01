import {ux} from '@oclif/core'

import Account from '../../model/account'
import {AuthenticatedCommand} from '../../model/command'
import PlanqkService from '../../service/planqk-service'

interface Context extends Record<string, unknown> {
  id: string
  displayName: string
  isOrganization: boolean
}

export default class ListContexts extends AuthenticatedCommand {
  planqkService!: PlanqkService

  static description = 'Retrieves the available contexts, i.e., the personal or organizational accounts available to you to work with.'

  static examples = [
    '$ planqk list-contexts',
  ]

  async init(): Promise<void> {
    await super.init()
    this.planqkService = new PlanqkService(this, this.config, this.userConfig)
  }

  async run(): Promise<void> {
    ux.action.start('Loading available contexts')
    const accounts: Account[] = await this.planqkService.getAccounts()
    ux.action.stop('Done')

    const tableData: Context[] = accounts.map(account => {
      return {id: account.id, displayName: account.displayName, isOrganization: account.isOrganization}
    })

    this.log()
    ux.table(tableData, {
      displayName: {
        header: 'Name',
        minWidth: 15,
      },
      id: {
        header: 'ID',
      },
      isOrganization: {
        header: 'Organization',
        get: row => row.isOrganization ? ' \u{2713}' : ' \u{2717}',
      },
    })
    this.log()
  }
}
