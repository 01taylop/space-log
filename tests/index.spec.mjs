import spaceLog from '../src/index.mjs'

jest.mock('chalk', () => ({
  underline: jest.fn().mockImplementation(text => `_${text}_`),
}))

describe('spaceLog', () => {

  const mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation(text => text)
  const mockedErrorLog = jest.spyOn(console, 'error').mockImplementation(text => text)
  const mockedInfoLog = jest.spyOn(console, 'info').mockImplementation(text => text)

  it('should log the data for the given config', () => {
    const data = [{
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
    }]
    spaceLog({
      columnKeys: ['foo', 'bar', 'baz'],
      headings: ['Foo', 'Bar'],
    }, data)

    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, '_Foo_    _Bar_       _Unknown_')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, 'Foo1   Bar1      Baz1')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, 'Foo2   -         Baz2')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(5, 'Foo456 Bar456789 -')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(6, '')
    expect(mockedConsoleLog).toHaveBeenCalledTimes(6)

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
