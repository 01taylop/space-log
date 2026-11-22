interface SpaceLogConfig<T extends SpaceLogDataItem<T> = SpaceLogDataItem> {
  columnKeys: readonly (keyof T & string)[]
  headings?: readonly string[]
  spaceSize?: number
}

type SpaceLogValue = string | number | boolean | null | undefined | ((text: string) => string)

type SpaceLogDataItem<T = Record<string, SpaceLogValue>> = { [K in keyof T]: SpaceLogValue }

type SpaceLogData<T extends SpaceLogDataItem<T> = SpaceLogDataItem> = readonly T[]

export type {
  SpaceLogConfig,
  SpaceLogData,
  SpaceLogDataItem,
  SpaceLogValue,
}
