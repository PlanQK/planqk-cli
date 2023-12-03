import {Command, Help} from '@oclif/core';

export default class PlanqkHelp extends Help {
  async showCommandHelp(command: Command.Class | Command.Loadable | Command.Cached): Promise<void> {
    await super.showCommandHelp(command)

    if (command.id === 'create-openapi') {
      console.log(
        'PREPARATION\n' +
        '  - open the files input/data.json and input/params.json in an editor\n' +
        '  - modify the json samples to suit your project\n' +
        '  - save the modifications\n')
      console.log(
        'HINTS\n' +
        '  supported data types:\n' +
        '  - Integer\n' +
        '    Example:\n' +
        '      "n_bits": 10\n' +
        '  - Number\n' +
        '    Example:\n' +
        '      "temperature": 22.80\n' +
        '  - String\n' +
        '    Example:\n' +
        '      "key": "123abc"\n' +
        '  - Boolean\n' +
        '    Example:\n' +
        '      "debug": false\n' +
        '  - Array of one of the above types\n' +
        '    Example:\n' +
        '      "names": ["John","James","Jessica"]\n' +
        '  - Object with attributes of one of the above types\n' +
        '    Example:\n' +
        '      "person": {\n' +
        '        "name": "Max",\n' +
        '        "age": 34,\n' +
        '        "hasQuantumKnowledge": true\n' +
        '      }\n')
      console.log(
        'TROUBLE FIXING\n' +
        '  - check the json syntax of your data.json and params.json files\n' +
        '  - you may fall back to the copy of the old openapi-spec.yml file which is saved under the name openapi-spec-saved.yml\n' +
        '  - if the generation does not work properly you have to correct the generated openapi-spec.yml file manually\n')
    }
  }
}
