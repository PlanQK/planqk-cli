import {Command} from '@oclif/core'
import {Config} from '@oclif/core/lib/config'
import UserConfig from '../model/user-config'

export class CommandService {
  cmd: Command
  config: Config
  userConfig: UserConfig

  constructor(cmd: Command, config: Config, userConfig: UserConfig) {
    this.cmd = cmd
    this.config = config
    this.userConfig = userConfig
  }
}
