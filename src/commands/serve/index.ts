import {AbstractCommand} from '../../model/command'
import {execSync, StdioOptions} from 'child_process'
import {Flags} from '@oclif/core'
import Listr from 'listr';
import {exec} from 'node:child_process';

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

  async executeAsyncCommand(command: string): Promise<any> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({stdout, stderr});
        }
      });
    });
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Serve);
    const hostPort = flags.port ? flags.port : 8081;

    const removeAndPullImageCommand = 'docker rmi -f serve && docker pull serve';

    const containerName = 'planqk-cli-serve';
    const buildCommand = `docker run -p ${hostPort}:8001 -v "$(pwd):/user_code" --name ${containerName} serve`;
    const runCommand = `docker start -a ${containerName}`;

    const tasks = new Listr([
      {
        title: 'Ensuring latest image',
        task: () => Promise.resolve(this.executeAsyncCommand(removeAndPullImageCommand)),
      },
      {
        title: 'Building container',
        task: () => Promise.resolve(this.executeAsyncCommand(buildCommand)),
      },
      {
        title: 'Starting container',
        task: () => this.executeCommand(runCommand),
      },
    ]);

    tasks.run().catch(error => {
      console.error(error);
    });
  }
}
