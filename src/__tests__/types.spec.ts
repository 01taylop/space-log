import { spaceLog } from '..'

import { TEST_DATA } from './fixtures'

describe('Type constraints', () => {

  it('constrains columnKeys to keys present in the data', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    spaceLog({ columnKeys: ['country', 'capital', 'flag', 'isIslandNation', 'population'] }, TEST_DATA)
    spaceLog({ columnKeys: ['country', 'capital'] }, TEST_DATA)
    spaceLog({ columnKeys: [] }, TEST_DATA)

    // @ts-expect-error - 'city' is not a key of TestCountry
    spaceLog({ columnKeys: ['city'] }, TEST_DATA)

    // @ts-expect-error - 'city' is not a key of TestCountry
    spaceLog({ columnKeys: ['country', 'city'] }, TEST_DATA)

    // Assertion is intentionally minimal; compile-time checks are the primary goal.
    expect(console.log).toHaveBeenCalled()
  })

  it('accepts data typed with a type alias', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    type TestCity = { city: string, population: number }
    const cities: readonly TestCity[] = [{ city: 'Tokyo', population: 14 }]

    spaceLog({ columnKeys: ['city', 'population'] }, cities)

    expect(console.log).toHaveBeenCalled()
  })

  it('rejects data with unsupported value types', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    interface TestEvent { name: string, date: Date }
    const events: readonly TestEvent[] = [{ name: 'Launch', date: new Date(0) }]

    // @ts-expect-error - Date is not a supported value type
    spaceLog({ columnKeys: ['name'] }, events)

    expect(console.log).toHaveBeenCalled()
  })

})
