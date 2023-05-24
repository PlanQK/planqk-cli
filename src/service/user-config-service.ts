import * as path from 'node:path'
import * as fs from 'fs-extra'
import UserConfig from '../model/user-config'

export default class UserConfigService {
  readUserConfig(location: string): UserConfig {
    const file = path.join(location, 'config.json')

    if (!fs.existsSync(file)) {
      return {}
    }

    return fs.readJsonSync(file, {encoding: 'utf-8'})
  }

  writeUserConfig(location: string, userConfig: UserConfig): UserConfig {
    const file = path.join(location, 'config.json')

    if (!fs.existsSync(file)) {
      fs.createFileSync(file)
    }

    fs.writeJsonSync(file, userConfig, {encoding: 'utf-8'})

    return this.readUserConfig(location)
  }
}