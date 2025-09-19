import chalk from 'chalk'

import spaceLog from '..'

jest.mock('chalk', () => ({
  blue: jest.fn().mockImplementation(text => text),
  underline: jest.fn().mockImplementation(text => `_${text}_`),
}))

describe('spaceLog', () => {

  const mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation(text => text)

  const testData = [{
    capital: 'Brasília',
    country: 'Brazil',
    flag: '🇧🇷'
  }, {
    capital: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵'
  }, {
    capital: 'Seoul',
    country: 'South Korea',
    flag: '🇰🇷'
  }]

  it('logs a table without headings', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
    }, testData)

    expect(mockedConsoleLog).toHaveBeenCalledTimes(3)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'Brazil      Brasília 🇧🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, 'Japan       Tokyo    🇯🇵')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Korea Seoul    🇰🇷')
  })

  it('logs a table with headings', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
      headings: ['Country', 'Capital', 'Flag'],
    }, testData)

    expect(mockedConsoleLog).toHaveBeenCalledTimes(6)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Country_     _Capital_  _Flag_')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'Brazil      Brasília 🇧🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, 'Japan       Tokyo    🇯🇵')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(5, 'South Korea Seoul    🇰🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(6, '')
  })

  it('logs a table with headings and extra space', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
      headings: ['Country', 'Capital', 'Flag'],
      spaceSize: 2,
    }, testData)

    expect(mockedConsoleLog).toHaveBeenCalledTimes(6)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Country_      _Capital_   _Flag_')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'Brazil       Brasília  🇧🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, 'Japan        Tokyo     🇯🇵')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(5, 'South Korea  Seoul     🇰🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(6, '')
  })

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

  describe('invalid usage', () => {

    it('logs a table with a missing heading', () => {
      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
        /* @ts-expect-error Testing invalid data */
        headings: ['Country', null, 'Flag'],
      }, [{
        capital: 'Madrid',
        country: 'Spain',
        flag: '🇪🇸'
      }])

      expect(mockedConsoleLog).toHaveBeenCalledTimes(4)
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Country_ _Unknown_ _Flag_')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'Spain   Madrid  🇪🇸')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, '')
    })

    it('logs a table with missing data', () => {
      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
        headings: ['Country', 'Capital', 'Flag'],
      }, [{
        country: 'South Africa',
        flag: '🇿🇦'
      }])

      expect(mockedConsoleLog).toHaveBeenCalledTimes(4)
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Country_      _Capital_ _Flag_')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Africa -       🇿🇦')
      expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, '')
    })

  })

  describe('error handling', () => {

    test.each([{
      description: 'handles Error objects by logging their message',
      expectedLog: 'Test error message',
      mockError: new Error('Test error message'),
    }, {
      description: 'handles non-Error objects by logging a default message',
      expectedLog: 'Unknown error',
      mockError: 'string error',
    }, {
      description: 'handles null errors by logging a default message',
      expectedLog: 'Unknown error',
      mockError: null,
    }, {
      description: 'handles undefined errors by logging a default message',
      expectedLog: 'Unknown error',
      mockError: undefined,
    }])('$description', ({ mockError, expectedLog }) => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      spaceLog({
        columnKeys: ['country', 'capital', 'flag'],
      }, [{
        country: 'Test',
        countryTheme: () => {
          throw mockError
        }
      }])

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
      expect(consoleErrorSpy).toHaveBeenCalledWith(expectedLog)
    })
  })

})
