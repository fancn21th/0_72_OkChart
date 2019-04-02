import { getWorkingDateCountByMonth } from '../TimeHelper'

test('201902', () => {
  expect(getWorkingDateCountByMonth('201902', null, null)).toEqual({
    workingDateCount: 20,
    nonWorkingDateCount: 8,
  })
})
