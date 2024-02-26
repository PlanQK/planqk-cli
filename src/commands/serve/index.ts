import {AbstractCommand} from '../../model/command'
import {execSync} from 'child_process'
import {Flags} from '@oclif/core'

export default class Serve extends AbstractCommand {
  static description = 'Allows the creation, status check and deletion of service instances.'

  static examples = [
    '$ planqk serve -p <port>',
  ]

  static flags = {
    port: Flags.integer({char: 'p', description: 'The port on which the serve command is executed', required: false}),
  }

  async run(): Promise<void> {
    try {
      const {flags} = await this.parse(Serve)
      const hostPort = flags.port ? flags.port : 8081;

      execSync(`docker run -p ${hostPort}:8001 -v "$(pwd):/user_code" ghcr.io/planqk/planqk-cli-serve:master`, {stdio: 'inherit'});
    } catch (error: any) {
      this.error(`Error: ${error.message}`);
    }
  }
}
