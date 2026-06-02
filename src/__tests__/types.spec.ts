import { spaceLog } from '..'

import { TEST_DATA } from './fixtures'

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
