import spaceLog from '../src/index.mjs'

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

  it('should log a spaced table with headings', () => {
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

  it('should log a spaced table without headings', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
    }, testData)

    expect(mockedConsoleLog).toHaveBeenCalledTimes(3)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, 'Brazil      Brasília 🇧🇷')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, 'Japan       Tokyo    🇯🇵')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'South Korea Seoul    🇰🇷')
  })

  it('should log the data for the given config', () => {
    spaceLog({
      columnKeys: ['foo', 'bar', 'baz'],
      headings: ['Foo', 'Bar'],
    }, [{
      bar: 'Bar1',
      baz: 'Baz1',
      foo: 'Foo1',
      fooTheme: console.info,
    }, {
      baz: 'Baz2',
      foo: 'Foo2',
    }, {
      bar: 'Bar456789',
      foo: 'Foo456',
    }])

    expect(mockedConsoleLog).toHaveBeenCalledTimes(6)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Foo_    _Bar_       _Unknown_')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'Foo1   Bar1      Baz1')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, 'Foo2   -         Baz2')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(5, 'Foo456 Bar456789 -')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(6, '')

    expect(mockedInfoLog).toHaveBeenCalledTimes(1)
    expect(mockedInfoLog).toHaveBeenNthCalledWith(1, 'Foo1')
  })

  it('should log an error if something goes wrong', () => {
    spaceLog({
      columnKeys: ['foo', 'bar', 'baz'],
      headings: ['Foo', 'Bar'],
    })

    expect(mockedErrorLog).toHaveBeenCalledTimes(1)
    expect(mockedErrorLog).toHaveBeenNthCalledWith(1, 'Cannot read properties of undefined (reading \'map\')')
  })
})
