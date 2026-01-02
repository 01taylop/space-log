import chalk from 'chalk'

import type { SpaceLogConfig, SpaceLogData } from './types'

const spaceLog = (config: SpaceLogConfig, data: SpaceLogData): void => {
  const { columnKeys, headings, spaceSize = 1 } = config

  if (!columnKeys.length || !data.length) {
    return
  }

  const hasHeadings = headings !== undefined && headings.length > 0

  // Intentional spacing
  if (hasHeadings) {
    console.log('')
  }

  // Calculate column widths
  const columnWidths: Record<string, number> = {}

  columnKeys.forEach((key, index) => {
    const headingLength = hasHeadings
      ? (headings[index]?.length ?? key.length)
      : 0
    const dataLengths = data.map(item => item[key]?.toString().length || 0)

    columnWidths[key] = Math.max(headingLength, ...dataLengths) + Math.max(spaceSize, 1)
  })

  // Log headings
  if (hasHeadings) {
    const headingLine = columnKeys.map((key, index) => {
      const title = headings[index] ?? key
      const spacing = columnWidths[key] - title.length
      return `${chalk.underline(title)}${' '.repeat(spacing)}`
    }).join('')
    console.log(headingLine.trim())
  }

  // Log data
  data.forEach(item => {
    let line = ''
    columnKeys.forEach(key => {
      const text = item[key]?.toString() || '-'
      const spacing = columnWidths[key] - text.length
      const theme = item[`${key}Theme`]
      const styledText = theme && typeof theme === 'function' ? theme(text) : text
      line = `${line}${styledText}${' '.repeat(spacing)}`
    })
    console.log(line.trim())
  })

  // Intentional spacing
  if (hasHeadings) {
    console.log('')
  }
}

export {
  spaceLog,
}

export default spaceLog
