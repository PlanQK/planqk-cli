
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
  gpu?: GpuConfiguration
}

export interface GpuConfiguration {
  type: GpuType;
  count: number;
}

export enum GpuType {
  NVIDIA_TESLA_T4 = 'NVIDIA_TESLA_T4',
  NVIDIA_TESLA_V100 = 'NVIDIA_TESLA_V100',
  NVIDIA_TESLA_A100 = 'NVIDIA_TESLA_A100',
  NVIDIA_TESLA_P100 = 'NVIDIA_TESLA_P100',
}
