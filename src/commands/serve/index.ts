import {AbstractCommand} from '../../model/command'
import {execSync, StdioOptions} from 'child_process'
import {Flags, ux} from '@oclif/core'
import Listr from 'listr'
import {exec} from 'node:child_process'
import {randomString} from '../../helper/random-string'

export default class Serve extends AbstractCommand {
  static description = 'Runs your current service code in a containerized environment to expose it through a ' +
    'local web server, similarly to how the PlanQK Platform would run your code. The local web server exposes the ' +
    'same RESTful HTTP endpoints to start a service execution, to check the status of running executions, to cancel ' +
    'executions, and to retrieve execution results.'

  static examples = [
    '$ planqk serve -p <port>',
  ]

  static flags = {
    port: Flags.integer({
      char: 'p',
      description: 'The port on which the local web server accepts requests',
      required: false,
    }),
  }

  static IMAGE = 'ghcr.io/planqk/planqk-cli-serve:master'
  static CONTAINER_NAME = 'planqk-cli-serve'

  executeCommand(command: string, stdioOption?: StdioOptions): void {
    try {
      execSync(`${command}`, {stdio: stdioOption ? stdioOption : 'inherit'})
    } catch (error: any) {
      this.error(`There might be problems with your dependencies. Don't forget to verify the requirements.txt file.\n\n${error.message}`)
    }
  }

  async executeAsyncCommand(command: string): Promise<any> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          resolve({stdout, stderr})
        }
      })
    })
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Serve)
    const hostPort = flags.port ? flags.port : 8081

    const containerName = `${Serve.CONTAINER_NAME}-${randomString(10)}`

    const tasks = new Listr([
      {
        title: 'Ensuring latest base image',
        task: () => this.executeAsyncCommand(`docker pull ${Serve.IMAGE}`),
      },
      {
        title: 'Building container',
        task: () => this.executeAsyncCommand(`docker run -e PORT=${hostPort} -p ${hostPort}:${hostPort} -v "$(pwd):/user_code" --name ${containerName} ${Serve.IMAGE}`),
      },
      {
        title: 'Starting container',
        task: () => Promise.resolve(),
      },
    ])

    this.log('Starting service locally...')
    tasks.run()
      .then(() => {
        const baseUrl = `http://localhost:${hostPort}`
        const docsUrl = `${baseUrl}/docs`

        this.log('\nService running at:')
        ux.url(`${baseUrl}`, baseUrl)
        this.log('\nDocumentation available at:')
        ux.url(`${docsUrl}`, docsUrl)
        this.log('')

        this.executeCommand(`docker start -i -a ${containerName}`)
      })
      .catch(error => this.error(error))
      .finally(() => this.executeAsyncCommand(`docker rm ${containerName}`))
  }
}
