
export default interface ManagedServiceConfig {
  serviceId?: string;
  name: string;
  description?: string;
  quantumBackend: QuantumBackend;
  resources?: ResourceConfiguration;
  runtime?: Runtime;
}

export enum QuantumBackend {
  IBM = 'IBM',
  IONQ = 'IONQ',
  DWAVE = 'DWAVE',
  NONE = 'NONE'
}

export enum Runtime {
  PYTHON = 'PYTHON',
  DOCKER =  'DOCKER',
  PYTHON_TEMPLATE = 'PYTHON_TEMPLATE'
}

export interface ResourceConfiguration {
  cpu: number;
  memory: number;
}
