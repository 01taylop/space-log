# 🛸 Space Log

Space Log is a simple function which logs tabular data, similar to that of `yarn outdated`.

![Regions of Japan](https://github.com/01taylop/space-log/blob/main/assets/results.png?raw=true)

## How to use Space Log?

Space Log exposes a function, `spaceLog`, which can be imported as a named or default export. Both commonJS and ESM are supported.

The `spaceLog` function has two required arguments; `config` and `data`.

### Config (object)

- `columnKeys`: An array of keys, i.e. the `data[key]` of each column.

- `headings`: An optional array of headings, i.e. the title of each column. If no headings are provided, only the data will be output.

### Data (array)

An array of objects containing the data to log.

A "theme" can be provided for a corresponding key by adding a property in the format `${key}Theme`. In the example below, `populationTheme` uses [chalk](https://www.npmjs.com/package/chalk) to render green text to indicate that the most populous region of Japan is Kantō.

## Example

```js
import chalk from 'chalk'
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
