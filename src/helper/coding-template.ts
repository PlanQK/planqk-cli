import axios, {ResponseType} from 'axios'
import AdmZip from 'adm-zip'

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
    const t = await axios.get('https://github.com/PlanQK/planqk-platform-samples/archive/refs/heads/master.zip', config)
    zip = new AdmZip(t.data, {})
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
