import {AbstractCommand} from '../../model/command'
import * as inquirer from 'inquirer'
import ManagedServiceConfig, {GpuType, QuantumBackend, Runtime} from '../../model/managed-service-config'
import * as AdmZip from 'adm-zip'
import axios, {ResponseType} from 'axios'
import serviceConfigService from '../../service/service-config-service'
import {ux} from '@oclif/core'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as YAML from 'js-yaml'


export default class Init extends AbstractCommand {
  static description = 'Initialize a PlanQK project.'

  static examples = [
    '$ planqk init',
  ]

  async run(): Promise<void> {
    const randomName = this.generateRandomName()

    const responses: any = await inquirer.prompt([
      {
        name: 'name',
        message: `Service name (${randomName}):`,
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
          {name: 'None (Creates planqk.json only)', value: undefined},
          {
            name: 'Starter Qiskit Aer',
            value: {
              path: 'python/python-starter-qiskit-aer',
              runtime: Runtime.PYTHON_TEMPLATE,
              quantumBackend: QuantumBackend.NONE,
            },
          },
          {
            name: 'Starter IonQ (Premium Tier)',
            value: {
              path: 'python/python-starter-ionq',
              runtime: Runtime.PYTHON_TEMPLATE,
              quantumBackend: QuantumBackend.IONQ,
            },
          },
          {
            name: 'Docker Go',
            value: {path: 'docker/docker-go', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE},
          },
          {
            name: 'Docker Node',
            value: {path: 'docker/docker-node', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE},
          },
          {
            name: 'Docker Python',
            value: {path: 'docker/docker-python', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE}
            ,
          },
          {
            name: 'Docker Qiskit Aer GPU',
            value: {path: 'docker/docker-qiskit-aer-gpu', runtime: Runtime.DOCKER, quantumBackend: QuantumBackend.NONE},
          },
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
          {name: 'NVIDIA® T4', value: GpuType.NVIDIA_TESLA_T4},
          {name: 'NVIDIA® V100', value: GpuType.NVIDIA_TESLA_V100},
        ],
      },
    ])

    const name = responses.name || randomName
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

    serviceConfigService.writeServiceConfig(destination, serviceConfig)

    // load template from github
    if (responses.template) {
      await this.loadCodingTemplate(responses.template.path, destination)
      this.updateNameInEnvironmentYml(name)
      this.updateReadme(name)
    }

    this.log('\u{1F389} Initialized project. Happy hacking!')

    this.log('\n Next steps:')
    this.log(`  \u{2022} cd ${name}`)
    this.log('  \u{2022} planqk up   (deploys your code as a service to the PlanQK platform)')
    this.log('  \u{2022} planqk run  (executes your service using the data from the input directory)')
    this.log('')
  }

  async loadCodingTemplate(templatePath: string, projectLocation: string): Promise<void> {
    try {
      const config = {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
        responseType: 'arraybuffer' as ResponseType,
      }

      const t = await axios.get('https://github.com/PlanQK/planqk-platform-samples/archive/refs/heads/master.zip', config)
      const zip = new AdmZip(t.data, {})

      const templateFolder = `planqk-platform-samples-master/coding-templates/${templatePath}/`
      const zipEntries = zip.getEntries()

      for (const entry of zipEntries) {
        if (!entry.isDirectory && entry.entryName.startsWith(templateFolder)) {
          let destinationPath = projectLocation

          // check if file is in subfolder
          if (entry.entryName.replace(templateFolder, '').includes('/')) {
            const pathWithinFolder = entry.entryName.replace(templateFolder, '')
            destinationPath = destinationPath + '/' + pathWithinFolder.slice(0, Math.max(0, pathWithinFolder.lastIndexOf('/')))
          }

          zip.extractEntryTo(entry.entryName, destinationPath, false, true)
        }
      }
    } catch {
      this.log('Error loading the code template: ' + templatePath)
    }
  }

  updateNameInEnvironmentYml(serviceName: string) {
    const destination = path.join(process.cwd(), serviceName, 'environment.yml')
    const data = fs.readFileSync(destination, 'utf8')

    const yamlObject: any = YAML.load(data);

    yamlObject.name = serviceName

    const updatedContent = YAML.dump(yamlObject);

    fs.writeFileSync(destination, updatedContent)
  }

  updateReadme(serviceName: string) {
    const destination = path.join(process.cwd(), serviceName, 'README.md')
    const data = fs.readFileSync(destination, 'utf8')
    // Split the content into an array of lines
    const lines = data.split('\n');

    // Update the heading
    lines[0] = `# ${serviceName}`

    // Find the line number containing the conda activate command
    const lineNumber = lines.findIndex(line => line.includes('conda activate'));
    lines[lineNumber] = `conda activate ${serviceName}`
    const updatedContent = lines.join('\n');
    fs.writeFileSync(destination, updatedContent)
  }

  generateRandomName(): string {
    const adjectives = [
      'admiring',
      'adoring',
      'blissful',
      'brave',
      'calm',
      'charming',
      'cozy',
      'dazzling',
      'delightful',
      'eager',
      'fierce',
      'fluffy',
      'gloomy',
      'graceful',
      'jolly',
      'lively',
      'misty',
      'peaceful',
      'radiant',
      'silly',
    ]

    const animals = [
      'aardvark',
      'alpaca',
      'antelope',
      'baboon',
      'bat',
      'beaver',
      'buffalo',
      'camel',
      'cheetah',
      'chimpanzee',
      'cobra',
      'cougar',
      'coyote',
      'crocodile',
      'dingo',
      'dolphin',
      'elephant',
      'elk',
      'ferret',
      'gazelle',
      'giraffe',
      'gorilla',
      'grizzly bear',
      'hippopotamus',
      'hyena',
      'jaguar',
      'kangaroo',
      'koala',
      'leopard',
      'lion',
      'llama',
      'lynx',
      'marmot',
      'moose',
      'orangutan',
      'otter',
      'panda',
      'panther',
      'puma',
      'rabbit',
      'raccoon',
      'rhinoceros',
      'seal',
      'shark',
      'skunk',
      'sloth',
      'tapir',
      'tiger',
      'walrus',
      'wombat',
      'zebra',
    ]

    const suffix = Math.random().toString(36).slice(2, 7)

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)]

    return `${randomAdjective}-${randomAnimal}-${suffix}`
  }
}
