import {Flags, ux} from '@oclif/core'
import fs from 'fs-extra'
import path from 'path'
import YAML from 'yaml'
import {AbstractCommand} from '../../model/command'
import ManagedServiceConfig, {Runtime} from '../../model/managed-service-config'
import {writeServiceConfig} from '../../service/service-config-service'
import {randomName} from '../../helper/random-name'
import {downloadArchive, extractTemplate, getReadmeTemplate, getTemplateVariables} from '../../helper/coding-template'
import AdmZip from 'adm-zip'
import {promptUserInput, UserInput} from './user-input'

export default class Init extends AbstractCommand {
  static description = 'Initialize a PlanQK project to create a service.'

  static examples = [
    '$ planqk init',
  ]

  static flags = {
    'non-interactive': Flags.boolean({
      description: 'Run it in non-interactive mode',
      required: false,
    }),
    name: Flags.string({description: 'The name of the service', required: false}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Init)
    const nonInteractive = flags['non-interactive']

    let name = randomName()
    const input: UserInput = nonInteractive ? {
      name: flags.name ? flags.name : name,
      description: '',
      template: {path: 'python/python-starter-qiskit', runtime: Runtime.PYTHON_TEMPLATE},
      cpu: 0.5,
      memory: 1,
      gpu: undefined,
    } : await promptUserInput(name)

    name = input.name || name
    // use current directory if no template is selected
    const destination = input.template ? path.join(process.cwd(), name) : path.join(process.cwd())

    // only if a template is selected
    if (input.template && fs.existsSync(destination)) {
      ux.error(`Destination ${destination} already exists. Please choose another name.`)
    }

    const serviceConfig: ManagedServiceConfig = {
      name: name,
      description: input.description,
      resources: {
        cpu: input.cpu,
        memory: input.memory,
      },
      runtime: input.template ? input.template.runtime : Runtime.PYTHON_TEMPLATE,
    }

    if (input.gpu) {
      serviceConfig!.resources!.gpu = {
        type: input.gpu,
        count: 1,
      }
    }

    // only if a template is selected
    if (input.template) {
      fs.mkdirSync(destination)
    }

    writeServiceConfig(destination, serviceConfig)

    // load template from GitHub
    if (input.template) {
      const zip = await downloadArchive()
      extractTemplate(zip, input.template.path, destination)

      this.updateEnvironmentYaml(name)
      this.updateReadme(zip, input.template.path, name)
    }

    this.log('\u{1F389} Initialized project. Happy hacking!')

    if (input.template) {
      this.log('\n Next steps:')
      this.log(`  \u{2022} cd ${name}`)
      this.log('  \u{2022} planqk up   (deploys your code as a service to the PlanQK Platform)')
      this.log('  \u{2022} planqk run  (executes your service using the data from the input directory)')
    }

    this.log('')
  }

  updateEnvironmentYaml(serviceName: string): void {
    const destination = path.join(process.cwd(), serviceName, 'environment.yml')
    // skip if there is no environment.yml
    if (!fs.existsSync(destination)) {
      return
    }

    const data = fs.readFileSync(destination, 'utf8')
    const yamlObject = YAML.parseDocument(data)

    yamlObject.set('name', serviceName)

    const updatedContent = YAML.stringify(yamlObject)
    fs.writeFileSync(destination, updatedContent)
  }

  updateReadme(zip: AdmZip, templatePath: string, projectName: string): void {
    const readmeFileLocation = path.join(process.cwd(), projectName, 'README.md')
    // skip if there is a README.md
    if (fs.existsSync(readmeFileLocation)) {
      return
    }

    let readmeContent = getReadmeTemplate(zip, templatePath)

    const variables = getTemplateVariables(zip, templatePath)
    // skip if there are no variables
    if (!variables) {
      return
    }

    // replace variables
    for (const variable of variables) {
      readmeContent = readmeContent.replace(new RegExp('\\${' + variable.name + '}', 'g'), variable.value)
    }

    // replace global variables
    readmeContent = readmeContent.replace(/\${PROJECT_NAME}/g, projectName)

    fs.writeFileSync(readmeFileLocation, readmeContent)
  }
}
