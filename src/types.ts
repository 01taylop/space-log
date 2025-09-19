interface SpaceLogConfig {
  columnKeys: Array<string>
  headings?: Array<string>
  spaceSize?: number
}

interface SpaceLogDataItem {
  [key: string]: string | number | boolean | null | undefined | ((text: string) => string)
}

export type {
  SpaceLogConfig,
  SpaceLogDataItem,
}
