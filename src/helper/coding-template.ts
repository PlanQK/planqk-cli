import AdmZip from 'adm-zip'
import YAML from 'js-yaml'

export const downloadArchive = async (): Promise<AdmZip> => {
  const config = {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
    responseType: 'arraybuffer' as ResponseType,
  }

  let zip: AdmZip

  try {
    const response = await fetch('https://github.com/PlanQK/planqk-platform-samples/archive/refs/heads/master.zip', config)
    const buffer = await response.arrayBuffer()
    zip = new AdmZip(Buffer.from(buffer), {})
  } catch (error) {
    throw new Error(`Internal error occurred, please contact your PlanQK administrator: ${error}`)
  }

  return zip
}

export const extractTemplate = (zip: AdmZip, templatePath: string, projectLocation: string): void => {
  const templateFolder = `planqk-platform-samples-master/coding-templates/${templatePath}/`
  for (const entry of zip.getEntries()) {
    if (!entry.isDirectory && entry.entryName.startsWith(templateFolder)) {
      let destinationPath = projectLocation

      // check if file is in sub-folder
      if (entry.entryName.replace(templateFolder, '').includes('/')) {
        const pathWithinFolder = entry.entryName.replace(templateFolder, '')
        destinationPath = destinationPath + '/' + pathWithinFolder.slice(0, Math.max(0, pathWithinFolder.lastIndexOf('/')))
      }

      zip.extractEntryTo(entry.entryName, destinationPath, false, true)
    }
  }
}

export const getReadmeTemplate = (zip: AdmZip, templatePath: string): string => {
  const basePath = 'planqk-platform-samples-master/coding-templates/'

  // first part of templatePath defines the template path
  const readmeLocation = templatePath.split('/').shift()

  for (const entry of zip.getEntries()) {
    if (!entry.isDirectory && entry.entryName.startsWith(`${basePath}${readmeLocation}/template-README.md`)) {
      return zip.readAsText(entry)
    }
  }

  throw new Error(`Internal error occurred, please contact your PlanQK administrator: template-README.md not found at '${basePath}${readmeLocation}'`)
}

export interface NameValuePair {
  name: string
  value: string
}

export const getTemplateVariables = (zip: AdmZip, templatePath: string): NameValuePair[] | undefined => {
  const variableFilesLocation = 'planqk-platform-samples-master/coding-templates/.vars/'

  // last part of templatePath is the name of the template
  const templateName = templatePath.split('/').pop()

  for (const entry of zip.getEntries()) {
    if (!entry.isDirectory && entry.entryName.startsWith(variableFilesLocation)) {
      const variableFile = entry.entryName.replace(variableFilesLocation, '')
      if (variableFile.includes(`${templateName}.yaml`)) {
        const data = zip.readAsText(entry)
        const yamlObject: any = YAML.load(data)
        if (yamlObject.vars) {
          return yamlObject.vars as NameValuePair[]
        }
      }
    }
  }

  return undefined
}
