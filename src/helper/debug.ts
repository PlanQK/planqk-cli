export const debugEnabled = (): boolean => {
  return Boolean(process.env.DEBUG && process.env.DEBUG !== '')
}
