interface SpaceLogConfig {
  columnKeys: readonly string[]
  headings?: readonly string[]
  spaceSize?: number
}

interface SpaceLogDataItem {
  [key: string]: string | number | boolean | null | undefined | ((text: string) => string)
}

type SpaceLogData = readonly SpaceLogDataItem[]

export type {
  SpaceLogConfig,
  SpaceLogData,
  SpaceLogDataItem,
}
