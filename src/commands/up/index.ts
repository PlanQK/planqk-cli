import {Flags, ux} from '@oclif/core'
import waitUntil from 'async-wait-until'
import * as fs from 'fs-extra'
import {ReadStream} from 'fs-extra'
import {tmpdir} from 'os'
import * as Path from 'path'
import * as AdmZip from 'adm-zip'
import {AuthenticatedCommand} from '../../model/command'
import {BuildJobDto} from '../../client/model/buildJobDto'
import ManagedServiceConfig from '../../model/managed-service-config'
import PlanqkService from '../../service/planqk-service'
import {ServiceDto} from '../../client/model/serviceDto'
import {ValidationResult} from '../../client/model/validationResult'
import {readServiceConfig, writeServiceConfig} from '../../service/service-config-service'

export default class Up extends AuthenticatedCommand {
  planqkService!: PlanqkService

  static description = 'Creates or updates a PlanQK Service'

  static examples = [
    '$ planqk up',
  ]

  static flags = {
    silent: Flags.boolean({
      description: 'Suppresses all outputs, helpful when executed in a CI/CD pipeline.',
      required: false,
    }),
  }

  async init(): Promise<void> {
    await super.init()
    this.planqkService = new PlanqkService(this, this.config, this.userConfig)
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Up)

    const serviceConfig: ManagedServiceConfig = readServiceConfig(process.cwd())
    const userCode = await this.zipUserCode()

    const silentMode = flags.silent

    let service: ServiceDto | undefined
    // if service already exists we update it
    if (serviceConfig.serviceId) {
      if (!silentMode) {
        ux.action.start('Updating service')
      }

      service = await this.planqkService.updateService(serviceConfig.serviceId, userCode)
    } else {
      if (!silentMode) {
        ux.action.start('Creating service')
      }

      service = await this.planqkService.createService(serviceConfig, userCode)
      serviceConfig.serviceId = service?.id
      writeServiceConfig(process.cwd(), serviceConfig)
    }

    // delete the temp file after create service call
    if (fs.existsSync(userCode.path)) {
      fs.unlinkSync(userCode.path)
    }

    const serviceDefinition = service && service.serviceDefinitions && service.serviceDefinitions[0]
    let buildJob: BuildJobDto | undefined
    try {
      await waitUntil(async () => {
          buildJob = await this.planqkService!.getBuildJob(service!, serviceDefinition!)

          if (!silentMode) {
            if (buildJob.step === BuildJobDto.StepEnum.BuildImage) {
              ux.action.start('Building Image (1/2)')
            } else if (buildJob.step === BuildJobDto.StepEnum.PushImage) {
              ux.action.start('Pushing Image (2/2)')
            }
          }

          return buildJob.status === BuildJobDto.StatusEnum.Success || buildJob.status === BuildJobDto.StatusEnum.Failure
        },
        {
          timeout: 10 * 60 * 1000, // 10 minute timeout
          intervalBetweenAttempts: 5000, // every 5 seconds
        })
    } catch (error) {
      this.error('Error while waiting for the build job to finish: ' + error)
      buildJob = undefined
    }

    if (buildJob && buildJob.status === BuildJobDto.StatusEnum.Success) {
      const msg = 'Service created \u{1F680}'
      if (silentMode) {
        this.log(msg)
      } else {
        ux.action.stop(msg)
      }
    } else if (buildJob && buildJob.status === BuildJobDto.StatusEnum.Failure) {
      const {validationResult} = buildJob
      let reason = 'Failed creating service'

      if (validationResult?.state === ValidationResult.StateEnum.Error && validationResult.summary) {
        reason = `${reason}: ${validationResult.summary}`
      }

      if (silentMode) {
        this.log(reason)
      } else {
        ux.action.stop(reason)
      }
    } else {
      const msg = 'Still pending, please check the PlanQK UI to determine the status'
      if (silentMode) {
        this.log(msg)
      } else {
        ux.action.stop(msg)
      }
    }

    this.exit()
  }

  zipUserCode(): ReadStream {
    const tmpFilePath = Path.join(tmpdir() + '/user_code.zip')

    if (fs.existsSync(tmpFilePath)) {
      fs.unlinkSync(tmpFilePath)
    }

    const zip = new AdmZip()
    zip.addLocalFolder(process.cwd())
    zip.writeZip(tmpFilePath)
    return fs.createReadStream(Path.join(tmpFilePath))
  }
}
