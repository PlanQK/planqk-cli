import {AbstractCommand} from '../../model/command'
import * as inquirer from 'inquirer'
import ManagedServiceConfig, {QuantumBackend, Runtime} from '../../model/managed-service-config'
import * as AdmZip from 'adm-zip'
import axios, {ResponseType} from 'axios'
import serviceConfigService from '../../service/service-config-service'

export default class Init extends AbstractCommand {
  static description = 'Initialize a PlanQK project.'

  static examples = [
    '$ planqk init',
  ]

  async run(): Promise<void> {
    const randomName = this.generateRandomName();

    const responses: any = await inquirer.prompt([
      {
        name: 'name',
        message: `Service name (${randomName}):`,
        type: 'input',
      }, {
        name: 'description',
        message: 'Description (optional):',
        type: 'input',
      }, {
        name: 'quantumBackend',
        message: 'Choose a quantum backend:',
        type: 'list',
        choices: [
          {name: 'None', value: QuantumBackend.NONE},
          {name: 'IBM', value: QuantumBackend.IBM},
          {name: 'D-Wave', value: QuantumBackend.DWAVE},
          {name: 'IonQ', value: QuantumBackend.IONQ},
        ],
      }, {
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
          {name: '24 vCPU (Premium Tier)', value: 24},
          {name: '28 vCPU (Premium Tier)', value: 28},
          {name: '32 vCPU (Premium Tier)', value: 32},
        ],
      }, {
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
        ],
      }, {
        name: 'runtime',
        message: 'Choose your runtime',
        type: 'list',
        choices: [{name: 'Python Template', value: Runtime.PYTHON_TEMPLATE}, {name: 'Docker', value: Runtime.DOCKER}],
      },
    ])

    const pythonTemplates = [
      {name: 'None', value: undefined},
      {name: 'D-Wave IDE', value: 'python/dwave-hello-ide'},
      {name: 'D-Wave Service', value: 'python/dwave-hello-service'},
      {name: 'Qiskit IonQ', value: 'python/qiskit-ionq'},
      {name: 'Vanilla', value: 'python/vanilla'},
    ]

    const dockerTemplates = [
      {name: 'None', value: undefined},
      {name: 'Docker Go', value: 'docker/docker-go'},
      {name: 'Docker Node', value: 'docker/docker-node'},
      {name: 'Docker Python', value: 'docker/docker-python'},
      {name: 'Docker Qiskit Aer GPU', value: 'docker/docker-qiskit-aer-gpu'},
    ]

    const templateResponses: any = await inquirer.prompt([
      {
        name: 'template',
        message: 'Choose a coding template',
        type: 'list',
        choices: responses.runtime === Runtime.PYTHON_TEMPLATE ? pythonTemplates : dockerTemplates,
      },
    ])

    const serviceConfig: ManagedServiceConfig = {
      name: responses.name || randomName,
      description: responses.description,
      quantumBackend: responses.quantumBackend,
      resources: {
        cpu: responses.cpu,
        memory: responses.memory,
      },
      runtime: responses.runtime,
    }

    serviceConfigService.writeServiceConfig(serviceConfig)

    // load template from github
    if (templateResponses.template) {
      await this.loadCodingTemplate(templateResponses.template)
    }

    this.log('\u{1F389} Initialized project. Happy hacking!')
  }

  async loadCodingTemplate(templatePath: string): Promise<void> {
    try {
      const config = {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
        responseType: 'arraybuffer' as ResponseType,
      };

      const t = await axios.get('https://github.com/PlanQK/planqk-platform-samples/archive/refs/heads/master.zip', config);
      const zip = new AdmZip(t.data, {})

      const templateFolder = `planqk-platform-samples-master/coding-templates/${templatePath}/`;
      const zipEntries = zip.getEntries();

      for (const entry of zipEntries) {
        if (!entry.isDirectory && entry.entryName.startsWith(templateFolder)) {
          let destinationPath = process.cwd();

          // check if file is in subfolder
          if (entry.entryName.replace(templateFolder, '').includes('/')) {
            const pathWithinFolder = entry.entryName.replace(templateFolder, '')
            destinationPath = destinationPath + '/' + pathWithinFolder.slice(0, Math.max(0, pathWithinFolder.lastIndexOf('/')))
          }

          zip.extractEntryTo(entry.entryName, destinationPath, false, true);
        }
      }
    } catch {
      this.log('Error loading the code template: ' + templatePath);
    }
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
    ];

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
    ];

    const suffix = Math.random().toString(36).slice(2, 7);

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

    return `${randomAdjective}-${randomAnimal}-${suffix}`;
  }
}
