import {ReadStream} from 'fs-extra'

export const streamToBlob = (stream: ReadStream, mimeType?: string): Promise<Blob> => {
  const chunks: any = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', err => reject(err))
    stream.on('end', () => {
      const blob = mimeType === null ? new Blob(chunks) : new Blob(chunks, {type: mimeType})
      resolve(blob)
    })
  })
}
