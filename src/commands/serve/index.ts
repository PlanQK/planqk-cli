import {AbstractCommand} from '../../model/command'
import {execSync, StdioOptions} from 'child_process'
import {Flags, ux} from '@oclif/core'

export default class Serve extends AbstractCommand {
  static description = 'Allows the creation, status check and deletion of service instances.'

  static examples = [
    '$ planqk serve -p <port>',
  ]

  static flags = {
    port: Flags.integer({char: 'p', description: 'The port on which the serve command is executed', required: false}),
  }

  executeCommand(command: string, stdioOption?: StdioOptions): void {
    try {
      execSync(`${command}`, {stdio: stdioOption ? stdioOption : 'inherit'});
    } catch (error: any) {
      this.error(`Error: ${error.message}`);
    }
  }

  removeAndPullImage(): void {
    ux.action.start('Ensuring latest image');
    this.executeCommand('docker rmi -f ghcr.io/planqk/planqk-cli-serve:master && docker pull ghcr.io/planqk/planqk-cli-serve:master', 'ignore');
    ux.action.stop()
  }

  startContainer(hostPort: string): void {
    ux.action.start('Start Container');
    this.executeCommand(`docker run -p ${hostPort}:8001 -v "$(pwd):/user_code" ghcr.io/planqk/planqk-cli-serve:master`);
    ux.action.stop('Stop Container');
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Serve);
    const hostPort = flags.port ? flags.port : 8081;

    this.removeAndPullImage();
    this.startContainer(hostPort.toString());
  }
}
