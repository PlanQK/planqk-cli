import {AuthenticatedCommand} from '../../model/command'
import PlanqkService from '../../service/planqk-service'
import {ux} from '@oclif/core'

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

    this.log(`Available services for ${this.userConfig.context?.displayName}:`)
    for (const service of services) {
      this.log(`- ${service.name} (${service.id})`)
    }
  }
}
