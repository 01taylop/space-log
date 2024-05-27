# 🛸 Space Log

[![CodeQL Analysis](https://github.com/01taylop/space-log/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/01taylop/space-log/actions/workflows/codeql-analysis.yml)
[![Test](https://github.com/01taylop/space-log/actions/workflows/test.yml/badge.svg)](https://github.com/01taylop/space-log/actions/workflows/test.yml)

Space Log is a utility which logs structured data to the console in a tabular format. It dynamically adjusts column widths based on the longest string in each column and supports optional underlined headings, with the ability to apply custom styling to the text.

- [Motivation](#motivation)
- [Example](#example)
- [Usage](#usage)
  - [Installation](#installation)
  - [Importing](#importing)
  - [Arguments](#arguments)
    - [Config (object)](#config-object)
    - [Data (array)](#data-array)

## Motivation

When running `yarn outdated`, any outdated dependencies are displayed in a well-presented, easy-to-read table in the terminal. Space Log replicates this functionality simply and efficiently, abstracting away the complex logic involved in calculating column widths based on the longest string in each column.

## Example

![Regions of Japan](https://github.com/01taylop/space-log/blob/main/assets/results.png?raw=true)

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

## Usage

### Installation

First, install the package as a dependency:

```bash
# Using yarn
yarn add space-log

# Using npm
npm install space-log
```

### Importing

You can import `spaceLog` using either CommonJS or ES Modules:

For CommonJS:

```js
const { spaceLog } = require('space-log')
```

For ES Modules:

```js
import { spaceLog } from 'space-log'
```

The `spaceLog` function can also be imported as a default export.

### Arguments

The `spaceLog` function has two required arguments; `config` and `data`.

#### Config (object)

- `columnKeys`: An array of keys representing the `data[key]` of each column.

- `headings`: An optional array of headings to use as the title of each column. If no headings are provided, only the data will be included in the output.

#### Data (array)

An array of objects containing the data to log.

A "theme" can be provided for a corresponding key by adding a property in the format `${key}Theme`. In the example below, `populationTheme` uses [chalk](https://www.npmjs.com/package/chalk) to render green text to indicate that the most populous region of Japan is Kantō.
