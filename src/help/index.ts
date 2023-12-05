import {Command, Help as HelpBase, ux} from '@oclif/core'

export default class Help extends HelpBase {
  async showCommandHelp(command: Command.Class | Command.Loadable | Command.Cached): Promise<void> {
    await super.showCommandHelp(command)

    if (command.id === 'create-openapi') {
      ux.styledHeader('How to generate your OpenAPI definition?')
      ux.info(
        'Open the files input/data.json and input/params.json in an editor. ' +
        'Modify the JSON samples to suit your project and save the modifications. ' +
        'Then simply run the command.',
      )

      ux.info('')
      ux.info('Supported data types:')
      ux.info('')
      ux.info('Numbers:')
      ux.styledJSON({qbits: 10})
      ux.info('')
      ux.info('Strings:')
      ux.styledJSON({key: '123abc'})
      ux.info('')
      ux.info('Booleans:')
      ux.styledJSON({debug: false})
      ux.info('')
      ux.info('Arrays of one of the above types:')
      ux.styledJSON({names: ['John', 'James', 'Jessica']})
      ux.info('')
      ux.info('Objects with attributes of one of the above types:')
      ux.styledJSON({person: {name: 'Max', age: 34, hasQuantumKnowledge: true}})
    }
  }
}
