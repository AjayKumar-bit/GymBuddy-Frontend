import { logger } from 'react-native-logs'

interface ICustomTransportParams {
  level: {
    text: string // The log level as a string (e.g., "debug", "info")
    severity: number // The severity level of the log (e.g., 0 for debug)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawMsg: any
}

const logColors: Record<string, string> = {
  debug: '\x1b[32m', // Note: ANSI escape code of green used to control text formatting in terminal output
  info: '\x1b[34m', // ANSI escape code of blue
  warn: '\x1b[33m', // ANSI escape code of yellow
  error: '\x1b[31m', // ANSI escape code of red
}

const resetColor = '\x1b[0m'

const logLevels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour12: true })
}

const customTransport = (params: ICustomTransportParams) => {
  const { level, rawMsg } = params
  const colorCode = logColors[level.text] || resetColor
  const time = getCurrentTime()
  const formattedMessage = JSON.stringify(rawMsg, null, 2).slice(1, -1)
  // eslint-disable-next-line no-console
  console.log(`${colorCode}[${time}] ${level.text} : ${formattedMessage}${resetColor}`)
}

const defaultConfig = {
  levels: logLevels,
  severity: 'debug',
  transport: customTransport,
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
}

export const log = logger.createLogger(defaultConfig)
