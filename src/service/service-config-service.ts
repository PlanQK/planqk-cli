import * as path from 'path'
import * as fs from 'fs-extra'
import ManagedServiceConfig from '../model/managed-service-config'

export const readServiceConfig = (location: string): ManagedServiceConfig => {
  const file = path.join(location, 'planqk.json')

  if (!fs.existsSync(file)) {
    throw new Error('No planqk.json file found in current directory')
  }

  return fs.readJsonSync(file, {encoding: 'utf-8'})
}

export const writeServiceConfig = (location: string, serviceConfig: ManagedServiceConfig): ManagedServiceConfig => {
  const file = path.join(location, 'planqk.json')

  if (!fs.existsSync(file)) {
    fs.createFileSync(file)
  }

  fs.writeJsonSync(file, serviceConfig, {encoding: 'utf-8', spaces: 2})

  return readServiceConfig(location)
}
