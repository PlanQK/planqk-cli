const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'

export const randomString = (length: number): string => {
  let value = ''

  for (let i = 0; i < length; i++) {
    value += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return value
}
