# 🛸 Space Log

[![Test](https://github.com/01taylop/space-log/actions/workflows/test.yml/badge.svg)](https://github.com/01taylop/space-log/actions/workflows/test.yml)

![Node Versions Supported](https://img.shields.io/static/v1?label=node&message=>=18.18.0&color=blue)

A utility for displaying data as formatted tables in the console. It automatically adjusts column widths, supports optional headings, and allows custom styling for individual data cells, making it ideal for CLI tools, build reports, and development dashboards.

- [Motivation](#motivation)
- [Example](#example)
- [Usage](#usage)
  - [Installation](#installation)
  - [Importing](#importing)
  - [Arguments](#arguments)
    - [Config (object)](#config-object)
    - [Data (array)](#data-array)

## Motivation

Building CLI tools and development utilities often requires displaying structured data in the console. However, creating well-formatted tables with proper alignment and spacing is surprisingly complex.

Space Log solves this by providing a simple API that automatically handles all the formatting complexity, letting you focus on your data rather than console layout. Whether you're building deployment dashboards, test reporters, or data analysis tools, you get professional-looking table output with minimal code.

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

Install the package as a dependency:

```bash
# Using npm
npm install space-log

# Using yarn
yarn add space-log
```

### Importing

You can import `spaceLog` using either CommonJS or ES Modules:

```js
// Using CommonJS
const { spaceLog } = require('space-log')

// Using ES Modules
import { spaceLog } from 'space-log'
```

The `spaceLog` function is exported both as a default and named export, so you can import it either way.

### Arguments

The `spaceLog` function has two required arguments; `config` and `data`.

#### Config (object)

| Property     | Type   | Required | Default | Description                                                |
|--------------|--------|----------|---------|------------------------------------------------------------|
| `columnKeys` | array  | ✅       | -       | Array of keys representing the `data[key]` of each column. |
| `headings`   | array  | -        | -       | Column headings. If omitted, only data is shown.           |
| `spaceSize`  | number | -        | 1       | Amount of whitespace around column content.                |

#### Data (array)

An array of objects containing the data to log.

A "theme" can be provided for a corresponding key by adding a property in the format `${key}Theme`. In the example above, `populationTheme` uses [chalk](https://www.npmjs.com/package/chalk) to render green text to indicate that the most populous region of Japan is Kantō.
