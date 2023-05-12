import {ux} from '@oclif/core'
import waitUntil from 'async-wait-until'
import {AuthenticatedCommand} from '../../model/command'
import PlanqkService from '../../service/planqk-service'
import {BuildJobDto} from '../../client/model/buildJobDto'
import ManagedServiceConfig from '../../model/managed-service-config'
import ServiceConfigService from '../../service/service-config-service'
import serviceConfigService from '../../service/service-config-service'
import * as fs from 'fs-extra'
import {ReadStream} from 'fs-extra'
import {tmpdir} from 'os';
import * as Path from 'path';
import * as AdmZip from 'adm-zip'
import {ServiceDto} from '../../client/model/serviceDto'
import {ValidationResult} from '../../client/model/validationResult';

export default class Up extends AuthenticatedCommand {
  static description = 'Creates or updates a PlanQK Service'

  static examples = [
    '$ planqk up',
  ]

  planqkService?: PlanqkService

  async init(): Promise<void> {
    await super.init()
    this.planqkService = new PlanqkService(this, this.config, this.userConfig)
  }

  async run(): Promise<void> {
    const serviceConfig: ManagedServiceConfig = ServiceConfigService.readServiceConfig()
    const userCode = await this.zipUserCode()

    let service: ServiceDto | undefined
    // if service already exists we update it
    if (serviceConfig.serviceId) {
      ux.action.start('Updating service')
      service = await this.planqkService?.updateService(serviceConfig.serviceId, userCode)
    } else {
      ux.action.start('Creating service')
      service = await this.planqkService?.createService(serviceConfig, userCode)
      serviceConfig.serviceId = service?.id
      serviceConfigService.writeServiceConfig(serviceConfig)
    }

    // delete the temp file after create service call
    if (fs.existsSync(userCode.path)) {
      fs.unlinkSync(userCode.path)
    }

    const serviceDefinition = service && service.serviceDefinitions && service.serviceDefinitions[0]

    let buildJob: BuildJobDto | null = null
    try {
      await waitUntil(async () => {
        buildJob = await this.planqkService!.getBuildJob(service!, serviceDefinition!)

        if (buildJob.step === BuildJobDto.StepEnum.BuildImage) {
          ux.action.start('Building Image (1/2)')
        } else if (buildJob.step === BuildJobDto.StepEnum.PushImage) {
          ux.action.start('Pushing Image (2/2)')
        }

        return buildJob.status === BuildJobDto.StatusEnum.Success || buildJob.status === BuildJobDto.StatusEnum.Failure
      },
      {
        timeout: 10 * 60 * 1000, // 10 minute timeout
        intervalBetweenAttempts: 5000, // every 5 seconds
      })
    } catch {
      buildJob = null;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (buildJob && buildJob!.status === BuildJobDto.StatusEnum.Success) {
      ux.action.stop('Service created \u{1F680}')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (buildJob && buildJob!.status === BuildJobDto.StatusEnum.Failure) {
      const {validationResult} = buildJob as BuildJobDto
      let reason = 'Failed creating service'

      if (validationResult?.state === ValidationResult.StateEnum.Error && validationResult.summary) {
        reason = `${reason}: ${validationResult.summary}`
      }

      ux.action.stop(reason)
    } else {
      ux.action.stop('Pending: please check the PlanQK UI to determine the status')
    }

    this.exit()
  }

  zipUserCode(): ReadStream {
    const tmpFilePath = Path.join(tmpdir() + '/user_code.zip')

    if (fs.existsSync(tmpFilePath)) {
      fs.unlinkSync(tmpFilePath)
    }

    const zip = new AdmZip();
    zip.addLocalFolder(process.cwd());
    zip.writeZip(tmpFilePath);
    return fs.createReadStream(Path.join(tmpFilePath))
  }
}
