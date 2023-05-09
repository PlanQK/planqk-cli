export enum AuthType {
  API_KEY = 'API_KEY'
}

export interface Authentication {
  type: AuthType;
  value: string;
}

export interface Endpoint {
  basePath: string;
  defaultHeaders: Record<string, unknown>;
}

export const defaultBasePath = 'https://platform.planqk.de/qc-catalog'

export default interface UserConfig {
  auth?: Authentication;
  endpoint?: Endpoint;
}
