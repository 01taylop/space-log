interface SpaceLogConfig {
  columnKeys: Array<string>
  headings?: Array<string>
  spaceSize?: number
}

interface SpaceLogDataItem {
  [key: string]: any
}

declare function spaceLog(config: SpaceLogConfig, data: Array<SpaceLogDataItem>): void

export { spaceLog }
export default spaceLog
