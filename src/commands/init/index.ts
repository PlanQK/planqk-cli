import {ux} from '@oclif/core'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import YAML from 'js-yaml'
import {AbstractCommand} from '../../model/command'
import ManagedServiceConfig, {GpuType, QuantumBackend, Runtime} from '../../model/managed-service-config'
import {writeServiceConfig} from '../../service/service-config-service'
import {randomName} from '../../helper/random-name'
import {downloadArchive, extractTemplate} from '../../helper/coding-template'

export default class Init extends AbstractCommand {
  static description = 'Initialize a PlanQK project.'

  static examples = [
    '$ planqk init',
  ]

  async run(): Promise<void> {
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
            name: 'Qiskit Starter (Simulator)',
            value: {
              path: 'python/python-starter-qiskit',
              runtime: Runtime.PYTHON_TEMPLATE,
              quantumBackend: QuantumBackend.NONE,
            },
          },
          {
            name: 'IonQ Starter (Premium Tier)',
            value: {
              path: 'python/python-starter-ionq',
              runtime: Runtime.PYTHON_TEMPLATE,
              quantumBackend: QuantumBackend.IONQ,
            },
          },
          {
            name: 'Docker Go Starter',
            value: {path: 'docker/docker-go', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE},
          },
          {
            name: 'Docker Node Starter',
            value: {path: 'docker/docker-node', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE},
          },
          {
            name: 'Docker Python Starter',
            value: {path: 'docker/docker-python', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE}
            ,
          },
          {
            name: 'Docker GPU Starter (Python/Qiskit)',
            value: {path: 'docker/docker-gpu-qiskit', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE},
          },
          {name: 'None (Creates planqk.json only)', value: undefined},
        ],
      },
      {
        name: 'cpu',
        message: 'Choose your vCPU configuration',
        type: 'list',
        choices: [
          {name: '0.5 vCPU', value: 0.5},
          {name: '1 vCPU', value: 1},
          {name: '2 vCPU (Premium Tier)', value: 2},
          {name: '4 vCPU (Premium Tier)', value: 4},
          {name: '6 vCPU (Premium Tier)', value: 6},
          {name: '8 vCPU (Premium Tier)', value: 8},
          {name: '10 vCPU (Premium Tier)', value: 10},
          {name: '12 vCPU (Premium Tier)', value: 12},
          {name: '14 vCPU (Premium Tier)', value: 14},
          {name: '16 vCPU (Premium Tier)', value: 16},
          {name: '18 vCPU (Premium Tier)', value: 18},
          {name: '20 vCPU (Premium Tier)', value: 20},
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
          {name: '6 GB (Premium Tier)', value: 6},
          {name: '8 GB (Premium Tier)', value: 8},
          {name: '10 GB (Premium Tier)', value: 10},
          {name: '12 GB (Premium Tier)', value: 12},
          {name: '14 GB (Premium Tier)', value: 14},
          {name: '16 GB (Premium Tier)', value: 16},
          {name: '18 GB (Premium Tier)', value: 18},
          {name: '20 GB (Premium Tier)', value: 20},
          {name: '22 GB (Premium Tier)', value: 22},
          {name: '24 GB (Premium Tier)', value: 24},
          {name: '28 GB (Premium Tier)', value: 28},
          {name: '30 GB (Premium Tier)', value: 30},
          {name: '32 GB (Premium Tier)', value: 32},
        ],
      },
      {
        name: 'gpu',
        message: 'Choose your GPU configuration',
        type: 'list',
        choices: [
          {name: 'No GPU support', value: undefined},
          {name: 'NVIDIA® T4 (Premium Tier)', value: GpuType.NVIDIA_TESLA_T4},
          {name: 'NVIDIA® V100 (Premium Tier)', value: GpuType.NVIDIA_TESLA_V100},
        ],
      },
    ])

    name = responses.name || name
    const destination = path.join(process.cwd(), name)

    if (fs.existsSync(destination)) {
      ux.error(`Destination ${destination} already exists. Please choose another name.`)
    }

    const serviceConfig: ManagedServiceConfig = {
      name: name,
      description: responses.description,
      quantumBackend: responses.template ? responses.template.quantumBackend : QuantumBackend.NONE,
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

    fs.mkdirSync(destination)

    writeServiceConfig(destination, serviceConfig)

    // load template from GitHub
    if (responses.template) {
      const zip = await downloadArchive()
      extractTemplate(zip, responses.template.path, destination)

      this.updateEnvironmentYaml(name)
      this.updateReadme(name)
    }

    this.log('\u{1F389} Initialized project. Happy hacking!')

    this.log('\n Next steps:')
    this.log(`  \u{2022} cd ${name}`)
    this.log('  \u{2022} planqk up   (deploys your code as a service to the PlanQK platform)')
    this.log('  \u{2022} planqk run  (executes your service using the data from the input directory)')
    this.log('')
  }

  updateEnvironmentYaml(serviceName: string): void {
    const destination = path.join(process.cwd(), serviceName, 'environment.yml')
    // skip if there is no environment.yml
    if (!fs.existsSync(destination)) {
      return
    }

    const data = fs.readFileSync(destination, 'utf8')
    const yamlObject: any = YAML.load(data)
    yamlObject.name = serviceName

    const updatedContent = YAML.dump(yamlObject)
    fs.writeFileSync(destination, updatedContent)
  }

  updateReadme(serviceName: string): void {
    const destination = path.join(process.cwd(), serviceName, 'README.md')
    // skip if there is a README.md
    if (fs.existsSync(destination)) {
      // return
    }

    // @TODO: generate README.md

    // fs.writeFileSync(destination, updatedContent)
  }
}
