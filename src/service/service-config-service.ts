import * as path from 'path'
import * as fs from 'fs-extra'
import ManagedServiceConfig from '../model/managed-service-config'

export default {
  readServiceConfig(): ManagedServiceConfig {
    const file = path.join(process.cwd(), 'planqk.json')

    if (!fs.existsSync(file)) {
      throw new Error('No planqk.json file found in current directory')
    }

    // eslint-disable-next-line no-warning-comments
    // TODO: validate config

    return fs.readJsonSync(file, {encoding: 'utf-8'})
  },
  writeServiceConfig(serviceConfig: ManagedServiceConfig): ManagedServiceConfig {
    const file = path.join(process.cwd(), 'planqk.json')

    if (!fs.existsSync(file)) {
      fs.createFileSync(file)
    }

    fs.writeJsonSync(file, serviceConfig, {encoding: 'utf-8', spaces: 2})

    return this.readServiceConfig();
  },
}
