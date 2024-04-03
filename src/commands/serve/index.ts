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

  static IMAGE = 'ghcr.io/planqk/planqk-cli-serve:master'
  static CONTAINER_NAME = 'planqk-cli-serve'

  executeCommand(command: string, stdioOption?: StdioOptions): void {
    try {
      execSync(`${command}`, {stdio: stdioOption ? stdioOption : 'inherit'});
    } catch (error: any) {
      this.error(`There might be problems with your dependencies. Don't forget to verify the requirements.txt file. ${error.message}`);
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

    const tasks = new Listr([
      {
        title: 'Ensuring latest image',
        task: () => this.executeAsyncCommand(`docker rmi -f ${Serve.IMAGE} && docker pull ${Serve.IMAGE}`).catch(error => {
          this.error(`${error.message}`);
        }),
      },
      {
        title: 'Building container',
        task: () => this.executeAsyncCommand(`docker run -p ${hostPort}:8001 -v "$(pwd):/user_code" --name ${Serve.CONTAINER_NAME} ${Serve.IMAGE}`)
          .catch(error => {
            this.error(`${error.message}`);
          }),
      },
      {
        title: 'Starting container',
        task: () => Promise.resolve(this.executeCommand(`docker start -a ${Serve.CONTAINER_NAME}`)),
      },
    ]);

    tasks.run().catch(error => {
      console.error(error);
    }).finally(() => this.executeAsyncCommand(`docker rm ${Serve.CONTAINER_NAME}`))
  }
}
