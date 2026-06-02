type TestCountry = {
  capital?: string
  country: string
  flag: string
  isIslandNation?: boolean
  population?: number
}

const TEST_DATA: ReadonlyArray<TestCountry> = [{
  capital: 'Brasília',
  country: 'Brazil',
  flag: '🇧🇷',
  isIslandNation: false,
  population: 213,
}, {
  capital: 'Tokyo',
  country: 'Japan',
  flag: '🇯🇵',
  isIslandNation: true,
  population: 124,
}, {
  capital: 'Seoul',
  country: 'South Korea',
  flag: '🇰🇷',
  isIslandNation: false,
  population: 51,
}]

export {
  TEST_DATA,
}
