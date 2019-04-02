const getDate = date => {
  const dateArray = date.split('')
  dateArray.splice(4, 0, '-')
  dateArray.splice(7, 0, '-')
  return new Date(dateArray.join(''))
}

const isWorkingDate2 = date => {
  const day = date.getDay()
  return day !== 0 && day !== 6
}

// Get Working Date Count By Month
const getWorkingDateCountByMonth = (yearMonth, startDateStr, endDateStr) => {
  if (yearMonth.length > 6) throw new Error('invalid year-month value')

  const year = yearMonth.substring(0, 4),
    month = yearMonth.substring(4),
    startDate = startDateStr ? getDate(startDateStr) : 0,
    startDateTime = startDate && startDate.getTime(),
    endDate = endDateStr
      ? getDate(endDateStr)
      : new Date(year, parseInt(month), 1),
    endDateTime = endDate.getTime() + 8 * 3600,
    firstDateOfMonth = new Date(year, parseInt(month) - 1, 1),
    firstDateOfMonthTime = firstDateOfMonth.getTime()

  let currentDate =
      startDateTime > firstDateOfMonthTime ? startDate : firstDateOfMonth,
    workingDateCount = 0,
    nonWorkingDateCount = 0,
    d = currentDate.getDate()

  const m = parseInt(month) - 1

  console.log(currentDate)

  while (currentDate.getMonth() === m && currentDate.getTime() < endDateTime) {
    if (isWorkingDate2(currentDate)) workingDateCount++
    else nonWorkingDateCount++

    currentDate.setDate(++d)
  }

  return { workingDateCount, nonWorkingDateCount }
}

const yearMonth = '201902',
  startDateStr = '20190201',
  endDateStr = '20190228'

console.log(getWorkingDateCountByMonth(yearMonth, startDateStr, endDateStr))
