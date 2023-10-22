import {ux, Flags} from '@oclif/core'
import {AbstractCommand} from '../../model/command'
import * as fs from 'fs-extra';
import path from 'path';
import YAML from 'yaml'

export default class CreateOpenapi extends AbstractCommand {
  static description = 'Creates the OpenAPI Spec based on the data-info from input-dir.'

  static examples = [
    '$ planqk create-openapi',
  ]

  static flags = {
    wd: Flags.string({description: 'Working dir (e.g. for tests)', required: false}),
  }

  workingDir = ''

  async init(): Promise<void> {
    await super.init()
  }

  async run(): Promise<void> {
    ux.action.start('start generation');

    const {flags} = await this.parse(CreateOpenapi)

    this.workingDir = flags.wd ? path.join(process.cwd(), flags.wd) : this.workingDir = process.cwd()

    // check and read all source files
    const openApiString = await this.getCurrentOpenAPI('openapi-spec.yml')
    const jsonOpenApi = YAML.parse(openApiString)
    const inputData = await this.getJsonDataFromFile('input/data.json')
    const jsonInputData = JSON.parse(inputData)
    const inputParams = await this.getJsonDataFromFile('input/params.json')
    const jsonInputParams = JSON.parse(inputParams)

    // make a copy of old OpenAPI-File
    await this.writeUpdatedOpenApi('openapi-spec-saved.yml', YAML.stringify(jsonOpenApi))

    // generate new Input-Data-Section
    const newOpenApiInputData = this.getOpenApiRepresentationOfObjectData(jsonInputData)
    jsonOpenApi.components.schemas.inputData.properties = newOpenApiInputData

    // generate new Input-Params-Section
    const newOpenApiInputParams = this.getOpenApiRepresentationOfInputParams(jsonInputParams)
    jsonOpenApi.components.schemas.inputParams = newOpenApiInputParams

    // save updated OpenAPI-File
    await this.writeUpdatedOpenApi('openapi-spec.yml', YAML.stringify(jsonOpenApi))

    ux.action.stop('finished');
  }

  async getCurrentOpenAPI(fileName: string): Promise<string>  {
    const file = path.join(this.workingDir, fileName)

    if (!fs.existsSync(file)) {
      ux.error('No openapi-spec.yml file found as base for generating a new one. Maybe you are in a wrong directory? ' + file)
    }

    return fs.readFileSync(file, 'utf8')
  }

  async getJsonDataFromFile(fileName: string): Promise<string> {
    const file = path.join(this.workingDir, fileName)

    if (!fs.existsSync(file)) {
      ux.error('Json file not found :' + file)
    }

    return fs.readFileSync(file, 'utf8')
  }

  isSimpleType(value: any): boolean {
    return (typeof value === 'string') ||
      (typeof value === 'number') ||
      (typeof value === 'boolean')
  }

  getSimpleTypeNameOfValue(value: any): string {
    if (typeof value === 'string') {
      return 'string'
    }

    if (typeof value === 'number') {
      return 'number'
    }

    if (typeof value === 'boolean') {
      return 'boolean'
    }

    ux.error('can not determine type of: ' + value)
  }

  getExampleRepresentationOfValue(value: any): string {
    let representation = ''
    if (typeof value === 'string') {
      // representation = '"' + value + '"'
      representation = `"${value}"`
    } else if (typeof value === 'number') {
      representation =  value.toString()
    } else if (typeof value === 'boolean') {
      representation = String(value)
    } else if (Array.isArray(value)) {
      representation = this.getExampleRepresentationOfValue(value[0])
    } else {
      representation = JSON.stringify(value)
    }

    return representation
  }

  getOpenApiRepresentationOfArrayData(arrayValue: any): string {
    if (this.isSimpleType(arrayValue)) {
      return JSON.parse('{"type": "' + this.getSimpleTypeNameOfValue(arrayValue) + '"}')
    }

    if (Array.isArray(arrayValue))  {
      return JSON.parse('{"type": "array","items":' + JSON.stringify(this.getOpenApiRepresentationOfArrayData(arrayValue[0])) + '}')
    }

    return JSON.parse('{"type": "object","properties":' + JSON.stringify(this.getOpenApiRepresentationOfObjectData(arrayValue)) + '}')
  }

  getOpenApiRepresentationOfObjectData(jsonInputData: object): object {
    let schemaAsText = '{}'
    Object.entries(jsonInputData).forEach(([key, value]) => {
      if (this.isSimpleType(value)) {
        schemaAsText = '{' + (schemaAsText.length > 2 ? schemaAsText.substring(1, schemaAsText.length - 1) + ',' : '') +
          '"' + key + '": {' +
          '"type": "' + this.getSimpleTypeNameOfValue(value) + '",' +
          '"example": ' + this.getExampleRepresentationOfValue(value) + '}}';
      }
      else if (Array.isArray(value)) {
        schemaAsText = '{' + (schemaAsText.length > 2 ? schemaAsText.substring(1, schemaAsText.length - 1) + ',' : '') +
          '"' + key + '": {' +
          '"type": "array",' +
          '"items": ' +
          (this.isSimpleType(value[0]) ? ('{"type": "' + this.getSimpleTypeNameOfValue(value[0]) + '"}') :
            (Array.isArray(value[0]) ?
              ('{"type": "array","items":' + JSON.stringify(this.getOpenApiRepresentationOfArrayData(value[0])) + '}') :
              ('{"type": "object","properties":' + JSON.stringify(this.getOpenApiRepresentationOfObjectData(value[0])) + '}'))) + ',' + '"example": ' + this.getExampleRepresentationOfValue(value) + '}}';
      }
      else {
        schemaAsText = '{' + (schemaAsText.length > 2 ? schemaAsText.substring(1, schemaAsText.length - 1) + ',' : '') +
          '"' + key + '": {' +
          '"type": "object",' +
          '"properties": ' + JSON.stringify(this.getOpenApiRepresentationOfObjectData(value)) + ',' +
          '"example": ' + this.getExampleRepresentationOfValue(value) + '}}';
      }
    });
    return JSON.parse(schemaAsText)
  }

  getOpenApiRepresentationOfInputParams(jsonInputParams: object) {
    const inputParamsAsText = '{"type":"object","properties":' + JSON.stringify(this.getOpenApiRepresentationOfObjectData(jsonInputParams)) + '}'
    return JSON.parse(inputParamsAsText)
  }

  async writeUpdatedOpenApi( fileName: string, openApiContent: string) {
    const file = path.join(this.workingDir, fileName)

    fs.writeFileSync(file, openApiContent)
  }
}
