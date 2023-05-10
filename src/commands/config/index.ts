import {AbstractCommand} from '../../model/command';

export default class Config extends AbstractCommand {
  static examples = [
    '$ planqk config get-context',
  ]

  async run(): Promise<void> {
    this.exit()
  }
}
