import { consoleTransport, logger } from 'react-native-logs'

type ColorType = 'red' | 'green' | 'yellow' | 'blue'

const logColors: Record<string, ColorType> = {
  info: 'blue',
  warn: 'yellow',
  error: 'red',
}

const logLevels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const defaultConfig = {
  levels: logLevels,
  severity: 'info',
  transport: consoleTransport,
  transportOptions: {
    colors: logColors,
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
}

export const log = logger.createLogger(defaultConfig)
