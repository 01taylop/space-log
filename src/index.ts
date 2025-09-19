import chalk from 'chalk'

import type { SpaceLogConfig, SpaceLogDataItem } from './types'

const DEFAULT_HEADING = 'Unknown'

const spaceLog = (config: SpaceLogConfig, data: Array<SpaceLogDataItem>): void => {
  try {
    const { columnKeys, headings, spaceSize = 1 } = config

    const hasHeadings = !!(headings && headings.length)

    // Intentional Spacing
    if (hasHeadings) {
      console.log('')
    }

    // Calculate Column Widths
    const columnWidths: Record<string, number> = {}

    columnKeys.forEach((key, index) => {
      const headingLength = hasHeadings
        ? (headings[index]?.length || DEFAULT_HEADING.length)
        : 0
      const dataLengths = data.map(item => item[key]?.toString().length || 0)

      columnWidths[key] = Math.max(headingLength, ...dataLengths) + spaceSize
    })

    // Log Headings
    if (hasHeadings) {
      const headingLine = columnKeys.map((key, index) => {
        const title = headings[index] || DEFAULT_HEADING
        const spacing = columnWidths[key] - title.length
        return `${chalk.underline(title)}${' '.repeat(spacing)}`
      }).join('')
      console.log(headingLine.trim())
    }

    // Log Data
    data.forEach(item => {
      let line = ''
      columnKeys.forEach(key => {
        const text = item[key]?.toString() || '-'
        const spacing = columnWidths[key] - text.length
        const theme = item[`${key}Theme`] || null
        const styledText = theme && typeof theme === 'function' ? theme(text) : text
        line = `${line}${styledText}${' '.repeat(spacing)}`
      })
      console.log(line.trim())
    })

    // Intentional Spacing
    if (hasHeadings) {
      console.log('')
    }
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : 'Unknown error')
  }
}

export {
  spaceLog,
}

export default spaceLog
