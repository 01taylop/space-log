import chalk from 'chalk'

const spaceLog = (config, data) => {
  const { columnKeys, headings } = config

  // Intentional Spacing
  console.log()

  // Calculate Column Width
  const columnWidths = {}

  columnKeys.forEach((key, index) => {
    const headingLength = headings[index].length
    const dataLengths = data.map(item => item[key].length)

    columnWidths[key] = Math.max(headingLength, ...dataLengths) + 1
  })

  // Log Headings
  const headingLine = columnKeys.map((key, index) => {
    const title = headings[index] || 'Unknown'
    const spacing = columnWidths[key] - title.length
    return `${chalk.underline(title)}${' '.repeat(spacing)}`
  }).join('')
  console.log(headingLine)

  // Log Data
  data.forEach(item => {
    let line = ''
    columnKeys.map(key => {
      const text = item[key] || '-'
      const spacing = columnWidths[key] - text.length
      const theme = item[`${key}Theme`] || null
      const styledText = theme ? theme(text) : text
      line = `${line}${styledText}${' '.repeat(spacing)}`
    })
    console.log(line)
  })

  // Intentional Spacing
  console.log()
}

export {
  spaceLog,
}

export default spaceLog
