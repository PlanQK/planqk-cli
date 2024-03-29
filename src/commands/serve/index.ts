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

  static image = 'ghcr.io/planqk/planqk-cli-serve:master'

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

  async buildContainer(containerName: string, hostPort: string): Promise<any> {
    const wasContainerCreatedCommand = `if docker inspect "${containerName}" >/dev/null 2>&1; then
    echo "true"
else
    echo "false"
fi`;

    const buildCommand = `docker run -p ${hostPort}:8001 -v "$(pwd):/user_code" --name ${containerName} ${Serve.image}`;
    const wasContainerCreatedResponse = await this.executeAsyncCommand(wasContainerCreatedCommand)

    if (wasContainerCreatedResponse.stdout.toString().includes('true')) {
      return;
    }

    await this.executeAsyncCommand(buildCommand);
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Serve);
    const hostPort = flags.port ? flags.port : 8081;

    const removeAndPullImageCommand = `docker rmi -f ${Serve.image} && docker pull ${Serve.image}`;

    const containerName = 'planqk-cli-serve';
    const runCommand = `docker start -a ${containerName}`;

    const tasks = new Listr([
      {
        title: 'Ensuring latest image',
        task: () => this.executeAsyncCommand(removeAndPullImageCommand).catch(error => {
          this.error(`${error.message}`);
        }),
      },
      {
        title: 'Building container',
        task: () => this.buildContainer(containerName, hostPort.toString())
          .catch(error => {
            this.error(`${error.message}`);
          }),
      },
      {
        title: 'Starting container',
        task: () => Promise.resolve(this.executeCommand(runCommand)),
      },
    ]);

    tasks.run().catch(error => {
      console.error(error);
    });
  }
}
