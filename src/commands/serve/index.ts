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
  static containerName = 'planqk-cli-serve'

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

    const wasContainerCreatedResponse = await this.executeAsyncCommand(wasContainerCreatedCommand)

    if (wasContainerCreatedResponse.stdout.toString().includes('true')) {
      // Create a new image from the old one to be able to mount the new volume if the directory has changed
      const imageName = containerName + this.generateRandomString(30);
      const reBuildCommand = `docker commit ${containerName} ${imageName} && docker rm ${containerName} && ${this.getBuildCommand(hostPort, containerName, imageName)}`
      await this.executeAsyncCommand(reBuildCommand);
    } else {
      await this.executeAsyncCommand(this.getBuildCommand(hostPort, containerName, Serve.image));
    }
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Serve);
    const hostPort = flags.port ? flags.port : 8081;

    const removeAndPullImageCommand = `docker rmi -f ${Serve.image} && docker pull ${Serve.image}`;

    const runCommand = `docker start -a ${Serve.containerName}`;

    const tasks = new Listr([
      {
        title: 'Ensuring latest image',
        task: () => this.executeAsyncCommand(removeAndPullImageCommand).catch(error => {
          this.error(`${error.message}`);
        }),
      },
      {
        title: 'Building container',
        task: () => this.buildContainer(Serve.containerName, hostPort.toString())
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

  generateRandomString(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  getBuildCommand(hostPort: string, containerName: string, imageName: string): string {
    return `docker run -p ${hostPort}:8001 -v "$(pwd):/user_code" --name ${containerName} ${imageName}`
  }
}
