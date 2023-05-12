import {AbstractCommand} from '../../model/command';

export default class Config extends AbstractCommand {
  static description = 'Manage planqk CLI context configuration.'

  static examples = [
    '$ planqk config:get-context',
    '$ planqk config:set-context',
  ]

  async run(): Promise<void> {
    this.exit()
  }
}
