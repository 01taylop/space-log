import { jest } from '@jest/globals'
import chalk from 'chalk'

import { spaceLog as spaceLogESM } from '../lib/index.js'

// @ts-ignore - CJS build doesn't have type definitions
const { spaceLog: spaceLogCJS } = await import('../lib/index.cjs')

describe.each([
  ['ESM', spaceLogESM],
  ['CJS', spaceLogCJS],
])('Integration tests - %s', (_format, spaceLog) => {

  const mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation(text => text)

  test('spaceLog works correctly', () => {
    spaceLog({
      columnKeys: ['country', 'capital', 'flag'],
      headings: ['Country', 'Capital City', 'Flag'],
    }, [
      { country: 'Brazil', capital: 'Brasília', flag: '🇧🇷' },
      { country: 'Japan', capital: 'Tokyo', flag: '🇯🇵' },
      { country: 'South Korea', capital: 'Seoul', flag: '🇰🇷' },
      { country: 'United Kingdom', capital: 'London', flag: '🇬🇧' },
    ])

    expect(mockedConsoleLog).toHaveBeenCalledTimes(7)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(1, '')
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(2, `${chalk.underline('Country')}        ${chalk.underline('Capital City')} ${chalk.underline('Flag')}`)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(3, `Brazil         Brasília     🇧🇷`)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(4, `Japan          Tokyo        🇯🇵`)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(5, `South Korea    Seoul        🇰🇷`)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(6, `United Kingdom London       🇬🇧`)
    expect(mockedConsoleLog).toHaveBeenNthCalledWith(7, '')
  })

})
