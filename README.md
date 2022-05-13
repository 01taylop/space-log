# 🛸 Space Log

A simple utility for logging tabular data.

![Regions of Japan](https://github.com/01taylop/space-log/blob/main/assets/results.png?raw=true)

## What is Space Log?

Space Log is a simple utility library which logs tabular data, similar to that of `yarn outdated`.

You could, and probably should, just use `console.table` unless you appreciate a borderless display of data.

## How to use Space Log?

Space Log exposes a function, `spaceLog`, which can be used as a named or default export. Both commonJS and ESM are supported.

The `spaceLog` function expects two arguments; config and data.

- `config.columnKeys`: An array of key names of the data to display.

- `config.headings`: An array of headings for each key, i.e. the title of each column.

- `data`: An array of objects containing the data to log.
  - A hyphen will be rendered if the object does not contain the required key for a given column.
  - A "theme" can be provided for a given key. In the example below, the population of Kantō will use [chalk](https://www.npmjs.com/package/chalk) to render green text because it is the largest region of Japan.

```js
import chalk from chalk
import { spaceLog } from 'space-log'

spaceLog({
  columnKeys: ['name', 'population', 'area'],
  headings: ['Region', 'Population', 'Area (km²)'],
}, [
  { name: 'Hokkaidō', population: '5.4 million', area: '83,000', areaTheme: chalk.green },
  { name: 'Tōhoku', population: '8.9 million', area: '67,000' },
  { name: 'Kantō', population: '43.3 million', area: '32,000', populationTheme: chalk.green },
  { name: 'Chūbu', population: '21.4 million', area: '67,000' },
  { name: 'Kansai', population: '22.5 million', area: '33,000' },
  { name: 'Chūgoku', population: '7.3 million', area: '32,000' },
  { name: 'Shikoku', population: '3.8 million', area: '19,000' },
  { name: 'Kyūshū & Okinawa', population: '14 million', area: '44,000' },
])
```
