import {
  getWorkingDateCountByMonth,
  getWorkingDateCountByWeek,
} from '../TimeHelper'

describe('测试 getWorkingDateCountByMonth', () => {
  test('201902 应该有 20 个 工作日 和 8个 非工作日', () => {
    // 断言
    expect(getWorkingDateCountByMonth('201902', null, null)).toEqual({
      workingDateCount: 20,
      nonWorkingDateCount: 8,
    })
  })

  test('201902 应该有 19 个 工作日 和 8个 非工作日', () => {
    expect(
      getWorkingDateCountByMonth('201902', '20190202', '20190227')
    ).toEqual({
      workingDateCount: 18,
      nonWorkingDateCount: 8,
    })
  })
})

describe('测试 getWorkingDateCountByWeek', () => {})
