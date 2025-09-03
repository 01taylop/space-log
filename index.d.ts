interface SpaceLogConfig {
  columnKeys: Array<string>
  headings?: Array<string>
  spaceSize?: number
}

interface SpaceLogDataItem {
  [key: string]: string | number | boolean | null | undefined | ((text: string) => string)
}

declare function spaceLog(config: SpaceLogConfig, data: Array<SpaceLogDataItem>): void

export {
  spaceLog,
}

export default spaceLog
