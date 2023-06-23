import {ux} from '@oclif/core'
import {AuthenticatedCommand} from '../../model/command'
import PlanqkService from '../../service/planqk-service'

interface Service extends Record<string, unknown> {
  id?: string
  name?: string
}

export default class Services extends AuthenticatedCommand {
  planqkService!: PlanqkService

  static description = 'List all available services of the current selected context.'

  static examples = [
    '$ planqk services',
  ]

  async init(): Promise<void> {
    await super.init()
    this.planqkService = new PlanqkService(this, this.config, this.userConfig)
  }

  async run(): Promise<void> {
    ux.action.start('Loading services')
    const services = await this.planqkService.getServices()
    ux.action.stop('Done')

    const tableData: Service[] = services.map(service => {
      return {id: service.id, name: service.name}
    })

    this.log(`Available services for ${this.userConfig.context?.displayName}:\n`)

    ux.table(tableData, {
      name: {
        header: 'Name',
        minWidth: 15,
      },
      id: {
        header: 'ID',
      },
    })
  }
}
