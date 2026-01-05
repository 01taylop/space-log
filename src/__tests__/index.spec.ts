import chalk from 'chalk'

import { spaceLog } from '..'

jest.mock('chalk', () => ({
  blue: jest.fn().mockImplementation(text => text),
  green: jest.fn().mockImplementation(text => text),
  underline: jest.fn().mockImplementation(text => `_${text}_`),
}))

describe('spaceLog', () => {

  const mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation(text => text)

  const TEST_DATA = [{
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

  it('does not log anything when there are no columnKeys', () => {
    spaceLog({
      columnKeys: [],
    }, TEST_DATA)

    expect(mockedConsoleLog).not.toHaveBeenCalled()
  })

  it('does not log anything when there is no data', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
    }, [])

    expect(mockedConsoleLog).not.toHaveBeenCalled()
  })

  it('logs a table', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
    }, TEST_DATA)

    expect(mockedConsoleLog).toHaveBeenCalledTimes(3)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'Brazil      Brasília 🇧🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, 'Japan       Tokyo    🇯🇵')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Korea Seoul    🇰🇷')
  })

  it('logs a table with other primitive values', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag', 'population', 'isIslandNation'],
    }, TEST_DATA)

    expect(mockedConsoleLog).toHaveBeenCalledTimes(3)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'Brazil      Brasília 🇧🇷 213 false')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, 'Japan       Tokyo    🇯🇵 124 true')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Korea Seoul    🇰🇷 51  false')
  })

  it('logs a table with headings', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
      headings: ['Country', 'Capital', 'Flag'],
    }, TEST_DATA)

    expect(mockedConsoleLog).toHaveBeenCalledTimes(6)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Country_     _Capital_  _Flag_')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'Brazil      Brasília 🇧🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, 'Japan       Tokyo    🇯🇵')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(5, 'South Korea Seoul    🇰🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(6, '')
  })

  it('logs a table with a missing heading', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag', 'population'],
      headings: ['Country', 'Capital', 'Flag'],
    }, [{
      capital: 'Madrid',
      country: 'Spain',
      population: 3.5,
      flag: '🇪🇸'
    }])

    expect(mockedConsoleLog).toHaveBeenCalledTimes(4)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Country_ _Capital_ _Flag_ _population_')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'Spain   Madrid  🇪🇸 3.5')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, '')
  })

  it('logs a table with missing data', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
    }, [...TEST_DATA, {
      country: 'South Africa',
      flag: '🇿🇦'
    }])

    expect(mockedConsoleLog).toHaveBeenCalledTimes(4)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'Brazil       Brasília 🇧🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, 'Japan        Tokyo    🇯🇵')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Korea  Seoul    🇰🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, 'South Africa -        🇿🇦')
  })

  describe('space size', () => {

    it('logs a table with a spaceSize of 2', () => {
      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
        spaceSize: 2,
      }, TEST_DATA)

      expect(mockedConsoleLog).toHaveBeenCalledTimes(3)
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'Brazil       Brasília  🇧🇷')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, 'Japan        Tokyo     🇯🇵')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Korea  Seoul     🇰🇷')
    })

    test.each([0, -2])('logs a table with a spaceSize of 1 when spaceSize is less than 1 (%s)', spaceSize => {
      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
        spaceSize,
      }, TEST_DATA)

      expect(mockedConsoleLog).toHaveBeenCalledTimes(3)
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'Brazil      Brasília 🇧🇷')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, 'Japan       Tokyo    🇯🇵')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Korea Seoul    🇰🇷')
    })

  })

  describe('theme modifier', () => {

    it('logs a table with a theme modifier', () => {
      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
      }, [{
        capital: 'London',
        country: 'United Kingdom',
        countryTheme: chalk.blue,
        flag: '🇬🇧'
      }])

      expect(mockedConsoleLog).toHaveBeenCalledTimes(1)
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'United Kingdom London 🇬🇧')
      expect(chalk.blue).toHaveBeenCalledTimes(1)
      expect(chalk.blue).toHaveBeenNthCalledWith(1, 'United Kingdom')
    })

    it('logs a table with multiple theme modifiers', () => {
      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
      }, [{
        capital: 'London',
        capitalTheme: chalk.green,
        country: 'United Kingdom',
        countryTheme: chalk.blue,
        flag: '🇬🇧'
      }])

      expect(mockedConsoleLog).toHaveBeenCalledTimes(1)
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'United Kingdom London 🇬🇧')
      expect(chalk.blue).toHaveBeenCalledTimes(1)
      expect(chalk.blue).toHaveBeenNthCalledWith(1, 'United Kingdom')
      expect(chalk.green).toHaveBeenCalledTimes(1)
      expect(chalk.green).toHaveBeenNthCalledWith(1, 'London')
    })

    it('logs a table with an invalid theme modifier', () => {
      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
      }, [{
        capital: 'London',
        country: 'United Kingdom',
        countryTheme: 'not a function',
        flag: '🇬🇧'
      }])

      expect(mockedConsoleLog).toHaveBeenCalledTimes(1)
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'United Kingdom London 🇬🇧')
    })

  })

})
