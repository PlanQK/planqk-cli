import {AuthenticatedCommand} from '../../model/command'
import PlanqkService from '../../service/planqk-service';
import ManagedServiceConfig from '../../model/managed-service-config';
import ServiceConfigService from '../../service/service-config-service';
import {Args, Flags, ux} from '@oclif/core';
import * as fs from 'fs-extra'
import * as path from 'path'
import * as inquirer from 'inquirer';
import waitUntil from 'async-wait-until';
import {JobDto} from '../../client/model/jobDto';

export default class Run extends AuthenticatedCommand {
  static description = 'Creates a job execution of a PlanQK Service'

  static examples = [
    '$ planqk run',
    '$ planqk run --detached',
    '$ planqk run -d "{"values": [10,12]}" -p "{"round_up": true}"',
    '$ planqk run --data-file=./input/dataV2.json --params-file=./input/paramsV2.json',
  ]

  planqkService!: PlanqkService

  static args = {
    serviceId: Args.string(),
  }

  static flags = {
    data: Flags.string({char: 'd', description: 'Input data as JSON string.', required: false}),
    params: Flags.string({char: 'p', description: 'Input data as JSON string.', required: false}),
    dataFile: Flags.string({aliases: ['data-file'], description: 'Relative path to file containing input data.', required: false}),
    paramsFile: Flags.string({aliases: ['params-file'], description: 'Relative path to file containing params.', required: false}),
    detached: Flags.boolean({description: 'Executes the job in detached mode, i.e., without waiting for it to finish.', required: false}),
  }

  async init(): Promise<void> {
    await super.init()
    this.planqkService = new PlanqkService(this, this.config, this.userConfig)
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Run)
    const {args} = await this.parse(Run)

    let serviceId = args.serviceId

    // if no service id is provided, try to read it from the planqk.json
    if (!serviceId) {
      try {
        const serviceConfig: ManagedServiceConfig = ServiceConfigService.readServiceConfig()
        serviceId = serviceConfig.serviceId
      } catch {
        ux.error('Missing service id. Please provide a service id as argument or set it in the planqk.json of your project.')
      }
    }

    if (!serviceId) ux.error('Missing service id. Please provide a service id as argument or set it in the planqk.json of your project.')

    const service = await this.planqkService.getService(serviceId)
    const serviceDefinitionId = service.serviceDefinitions![0].id!

    const data = flags.data ? this.fixJsonString(flags.data) : await this.getInputData(flags.dataFile || '/input/data.json')
    const params = flags.params ? this.fixJsonString(flags.params) : await this.getParams(flags.paramsFile || '/input/params.json')

    const payload = {
      inputData: data,
      parameters: params,
      persistResult: false,
      serviceDefinitionId: serviceDefinitionId,
    }

    let job: JobDto
    job = await this.planqkService.runJob(payload)

    if (flags.detached) {
      ux.info(`Job (${job.id}) created.`)
      this.exit()
    }

    ux.action.start(`Running Job (${job.id})`)

    try {
      await waitUntil(async () => {
        job = await this.planqkService.getJobById(job.id as string)
        return job.status === JobDto.StatusEnum.Success || job.status === JobDto.StatusEnum.Failed
      },
      {
        timeout: 10 * 60 * 1000, // 10 minute timeout
        intervalBetweenAttempts: 5000, // every 5 seconds
      })
    } catch {
      // ignore wait until next attempt
    }

    const jobDetailsLink = `https://platform.planqk.de/jobs/${job.id}`
    if (job.status === JobDto.StatusEnum.Success) {
      ux.action.stop('Job succeeded.')
      ux.info(`See result at \u001B]8;;${jobDetailsLink}\u0007${jobDetailsLink}\u001B]8;;\u0007\``)
    } else if (job.status === JobDto.StatusEnum.Failed) {
      ux.action.stop('Job failed.')
      ux.info(`See details at \u001B]8;;${jobDetailsLink}\u0007${jobDetailsLink}\u001B]8;;\u0007\``)
    } else {
      ux.action.stop('Timeout polling status.')
      ux.info(`See status details at \u001B]8;;${jobDetailsLink}\u0007${jobDetailsLink}\u001B]8;;\u0007\``)
    }

    this.exit()
  }

  async getInputData(relativePath: string): Promise<string | undefined> {
    const location = path.join(process.cwd(), relativePath)

    if (!fs.existsSync(location)) {
      const response = await inquirer.prompt({
        name: 'confirm',
        message: `No input file found under ${relativePath}. Run without input data?`,
        type: 'confirm',
      })
      if (response.confirm) return
      this.exit()
    }

    return JSON.stringify(fs.readJsonSync(location, {encoding: 'utf-8'}))
  }

  async getParams(relativePath: string): Promise<string | undefined> {
    const location = path.join(process.cwd(), relativePath)

    if (!fs.existsSync(location)) {
      const response = await inquirer.prompt({
        name: 'confirm',
        message: `No params file found under ${relativePath}. Run without params?`,
        type: 'confirm',
      })
      if (response.confirm) return
      this.exit()
    }

    return JSON.stringify(fs.readJsonSync(location, {encoding: 'utf-8'}))
  }

  fixJsonString(jsonString: string): string {
    const regex = /([,{])(\s*)(\w+?)\s*:/g;
    return jsonString.replace(regex, '$1"$3":');
  }
}
