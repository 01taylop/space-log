import spaceLog from '../src/index.js'

jest.mock('chalk', () => ({
  underline: jest.fn().mockImplementation(text => `_${text}_`),
}))

describe('spaceLog', () => {

  const mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation(text => text)
  const mockedErrorLog = jest.spyOn(console, 'error').mockImplementation(text => text)
  const mockedInfoLog = jest.spyOn(console, 'info').mockImplementation(text => text)

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

  it('logs a table with a missing heading', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
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

  it('logs a table with a theme modifier', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
    }, [{
      capital: 'London',
      country: 'United Kingdom',
      countryTheme: console.info,
      flag: '🇬🇧'
    }])

    expect(mockedConsoleLog).toHaveBeenCalledTimes(1)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'United Kingdom London 🇬🇧')

    expect(mockedInfoLog).toHaveBeenCalledTimes(1)
    expect(mockedInfoLog).toHaveBeenNthCalledWith(1, 'United Kingdom')
  })

  it('logs an error if something goes wrong, but does not throw', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
    })

    expect(mockedErrorLog).toHaveBeenCalledTimes(1)
    expect(mockedErrorLog).toHaveBeenNthCalledWith(1, 'Cannot read properties of undefined (reading \'map\')')
  })

})
