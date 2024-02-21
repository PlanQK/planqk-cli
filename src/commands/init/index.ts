import {Flags, ux} from '@oclif/core'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import YAML from 'yaml'
import {AbstractCommand} from '../../model/command'
import ManagedServiceConfig, {GpuType, Runtime} from '../../model/managed-service-config'
import {writeServiceConfig} from '../../service/service-config-service'
import {randomName} from '../../helper/random-name'
import {downloadArchive, extractTemplate, getReadmeTemplate, getTemplateVariables} from '../../helper/coding-template'
import AdmZip from 'adm-zip'

export default class Init extends AbstractCommand {
  static description = 'Initialize a PlanQK project to create a service.'

  static examples = [
    '$ planqk init',
  ]

  static flags = {
    'non-interactive': Flags.boolean({description: 'Run it in non-interactive mode', required: false}),
    name: Flags.string({description: 'The name of the service', required: false}),
    description: Flags.string({description: 'The description of the service', required: false}),
    template: Flags.string({
      description: 'The coding template path; the relative path to PlanQK samples repository',
      required: false,
    }),
    cpu: Flags.string({description: 'The vCPU configuration as integer, e.g., "1" for 1 vCPU', required: false}),
    memory: Flags.string({description: 'The memory configuration as integer, e.g., "1" for 1 GB', required: false}),
  }

  async run(): Promise<void> {
    // const {flags} = await this.parse(Init)
    let name = randomName()
    const responses: any = await inquirer.prompt([
      {
        name: 'name',
        message: `Service name (${name}):`,
        type: 'input',
      },
      {
        name: 'description',
        message: 'Description (optional):',
        type: 'input',
      },
      {
        name: 'template',
        message: 'Choose a coding template',
        type: 'list',
        choices: [
          {
            name: 'Qiskit Starter (Local Simulator)',
            value: {path: 'python/python-starter-qiskit', runtime: Runtime.PYTHON_TEMPLATE},
          },
          {
            name: 'IonQ Starter (Cloud Simulator)',
            value: {path: 'python/python-starter-ionq', runtime: Runtime.PYTHON_TEMPLATE},
          },
          {
            name: 'Qiskit IBMQ Starter (own access token required)',
            value: {path: 'python/python-starter-ibmq', runtime: Runtime.PYTHON_TEMPLATE},
          },
          {
            name: 'D-Wave Leap Starter (own access token required)',
            value: {path: 'python/python-starter-dwave', runtime: Runtime.PYTHON_TEMPLATE},
          },
          {
            name: 'PennyLane Starter (Simulator)',
            value: {path: 'python/python-starter-pennylane', runtime: Runtime.PYTHON_TEMPLATE},
          },
          {
            name: 'Docker Go Starter',
            value: {path: 'docker/docker-go', runtime: Runtime.DOCKER},
          },
          {
            name: 'Docker Node Starter',
            value: {path: 'docker/docker-node', runtime: Runtime.DOCKER},
          },
          {
            name: 'Docker Python Starter',
            value: {path: 'docker/docker-python', runtime: Runtime.DOCKER},
          },
          {
            name: 'Docker GPU Starter (Python/Qiskit)',
            value: {path: 'docker/docker-gpu-qiskit', runtime: Runtime.DOCKER},
          },
          {
            name: 'PlanQK Dev Container',
            value: {path: 'python/python-starter', runtime: Runtime.PYTHON_TEMPLATE},
          },
          {name: 'None (creates "planqk.json" only in current directory)', value: undefined},
        ],
      },
      {
        name: 'cpu',
        message: 'Choose your vCPU configuration',
        type: 'list',
        choices: [
          {name: '0.5 vCPU', value: 0.5},
          {name: '1 vCPU', value: 1},
          {name: '2 vCPU (Pro)', value: 2},
          {name: '4 vCPU (Pro)', value: 4},
          {name: '6 vCPU (Business)', value: 6},
          {name: '8 vCPU (Business)', value: 8},
          {name: '10 vCPU (Business)', value: 10},
          {name: '12 vCPU (Business)', value: 12},
          {name: '14 vCPU (Business)', value: 14},
          {name: '16 vCPU (Business)', value: 16},
          {name: '18 vCPU (Business)', value: 18},
          {name: '20 vCPU (Business)', value: 20},
        ],
      },
      {
        name: 'memory',
        message: 'Choose your memory configuration',
        type: 'list',
        choices: [
          {name: '1 GB', value: 1},
          {name: '2 GB', value: 2},
          {name: '3 GB', value: 3},
          {name: '4 GB', value: 4},
          {name: '6 GB (Pro)', value: 6},
          {name: '8 GB (Pro)', value: 8},
          {name: '10 GB (Business)', value: 10},
          {name: '12 GB (Business)', value: 12},
          {name: '14 GB (Business)', value: 14},
          {name: '16 GB (Business)', value: 16},
          {name: '18 GB (Business)', value: 18},
          {name: '20 GB (Business)', value: 20},
          {name: '22 GB (Business)', value: 22},
          {name: '24 GB (Business)', value: 24},
          {name: '28 GB (Business)', value: 28},
          {name: '30 GB (Business)', value: 30},
          {name: '32 GB (Business)', value: 32},
        ],
      },
      {
        name: 'gpu',
        message: 'Choose your GPU configuration',
        type: 'list',
        choices: [
          {name: 'No GPU support', value: undefined},
          {name: 'NVIDIA® T4 (Pro)', value: GpuType.NVIDIA_TESLA_T4},
          {name: 'NVIDIA® V100 (Pro)', value: GpuType.NVIDIA_TESLA_V100},
        ],
      },
    ])

    name = responses.name || name
    // use current directory if no template is selected
    const destination = responses.template ? path.join(process.cwd(), name) : path.join(process.cwd())

    // only if a template is selected
    if (responses.template && fs.existsSync(destination)) {
      ux.error(`Destination ${destination} already exists. Please choose another name.`)
    }

    const serviceConfig: ManagedServiceConfig = {
      name: name,
      description: responses.description,
      resources: {
        cpu: responses.cpu,
        memory: responses.memory,
      },
      runtime: responses.template ? responses.template.runtime : Runtime.PYTHON_TEMPLATE,
    }

    if (responses.gpu) {
      serviceConfig!.resources!.gpu = {
        type: responses.gpu,
        count: 1,
      }
    }

    // only if a template is selected
    if (responses.template) {
      fs.mkdirSync(destination)
    }

    writeServiceConfig(destination, serviceConfig)

    // load template from GitHub
    if (responses.template) {
      const zip = await downloadArchive()
      extractTemplate(zip, responses.template.path, destination)

      this.updateEnvironmentYaml(name)
      this.updateReadme(zip, responses.template.path, name)
    }

    this.log('\u{1F389} Initialized project. Happy hacking!')

    if (responses.template) {
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
