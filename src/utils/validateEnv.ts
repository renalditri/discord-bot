export const validateEnv = (): boolean => {
  if (process.env.TOKEN === null || process.env.TOKEN === undefined) {
    console.warn('Missing Discord bot token.')
    return false
  }

  if (process.env.MONGO_URI === null || process.env.MONGO_URI === undefined) {
    console.warn('Missing MongoDB connection.')
    return false
  }
  return true
}
