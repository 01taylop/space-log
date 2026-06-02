interface SpaceLogConfig<T extends SpaceLogDataItem = SpaceLogDataItem> {
  columnKeys: readonly (keyof T & string)[]
  headings?: readonly string[]
  spaceSize?: number
}

type SpaceLogDataItem = Record<string, string | number | boolean | null | undefined | ((text: string) => string)>

type SpaceLogData<T extends SpaceLogDataItem = SpaceLogDataItem> = readonly T[]

export type {
  SpaceLogConfig,
  SpaceLogData,
  SpaceLogDataItem,
}
