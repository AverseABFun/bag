import { prisma } from './db'
import { LoggerLevels } from '@prisma/client'

export const err = (...text: any[]) => {
  text = text.map(arg => arg.toString())
  console.error(`[INVENTORY] (err) ${text.join('')}`)
  prisma.logger.create({
    data: {
      level: LoggerLevels.ERROR,
      contents: `[INVENTORY] (err) ${text.join('')}`
    }
  })
}

export const log = (...text: any[]) => {
  text = text.map(arg => arg.toString())
  console.log(`[INVENTORY] (log) ${text.join('')}`)
  prisma.logger.create({
    data: {
      contents: `[INVENTORY] (log) ${text.join('')}`
    }
  })
}
