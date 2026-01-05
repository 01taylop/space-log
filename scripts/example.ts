import chalk from 'chalk'

import { spaceLog } from '../src'

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
