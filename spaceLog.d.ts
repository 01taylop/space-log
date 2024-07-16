interface SpaceLogConfig {
  columnKeys: Array<string>
  headings?: Array<string>
  spaceSize?: number
}

interface SpaceLogDataItem {
  [key: string]: string | undefined | ((text: string) => string)
}

function spaceLog(config: SpaceLogConfig, data: SpaceLogDataItem[]): void

export { spaceLog }

export default spaceLog
