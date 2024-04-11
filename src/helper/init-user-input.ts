import inquirer from 'inquirer'
import {GpuType, Runtime} from '../model/managed-service-config'

export interface TemplateInput {
  path: string,
  runtime: Runtime
}

export interface UserInput {
  name: string,
  description: string,
  template: TemplateInput | undefined,
  cpu: number,
  memory: number,
  gpu: GpuType | undefined,
}

export const promptUserInput = (defaultName: string): Promise<UserInput> => {
  return inquirer.prompt([
    {
      name: 'name',
      message: `Service name (${defaultName}):`,
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
          name: 'PlanQK Starter',
          value: {path: 'python/python-starter', runtime: Runtime.PYTHON_TEMPLATE},
        },
        {
          name: 'IonQ Starter (Azure Quantum)',
          value: {path: 'python/python-starter-ionq', runtime: Runtime.PYTHON_TEMPLATE},
        },
        {
          name: 'AWS Braket Starter',
          value: {path: 'python/python-starter-aws', runtime: Runtime.PYTHON_TEMPLATE},
        },
        {
          name: 'PennyLane Starter (Simulator)',
          value: {path: 'python/python-starter-pennylane', runtime: Runtime.PYTHON_TEMPLATE},
        },
        {
          name: 'Qiskit Starter (Aer Simulator)',
          value: {path: 'python/python-starter-qiskit', runtime: Runtime.PYTHON_TEMPLATE},
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
          name: 'Munich Quantum Toolkit (Quantum Dev Tools and Simulator)',
          value: {path: 'python/python-starter-mqt', runtime: Runtime.PYTHON_TEMPLATE},
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
}
