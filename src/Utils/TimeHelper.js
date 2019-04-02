const dateDiff = (startDate, endDate) => {
  const date1 = new Date(startDate)
  const date2 = new Date(endDate)
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

const timespanDiff = (timespan, startDate, endDate) => {
  if (startDate && endDate) return dateDiff(startDate, endDate) + 1
  return parseInt(timespan, 10)
}

const doubleTimespanStartDate = (startDate, endDate) => {
  const date1 = new Date(startDate)
  const date2 = new Date(endDate)
  const timeDiff =
    Math.abs(date2.getTime() - date1.getTime()) + 1000 * 3600 * 24
  const doubleTimespanStartDateTime = date1.getTime() - timeDiff
  const doubleTimespanStartDate = new Date(doubleTimespanStartDateTime)
  const year = doubleTimespanStartDate.getFullYear()
  let month = doubleTimespanStartDate.getMonth() + 1
  month = month.toString().padStart(2, '0')
  let day = doubleTimespanStartDate.getDate()
  day = day.toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// expected format: yyyyMMdd e.g. 20190101
const getDate = date => {
  const dateArray = date.split('')
  dateArray.splice(4, 0, '-')
  dateArray.splice(7, 0, '-')
  return new Date(dateArray.join(''))
}

// expected format: yyyyMMdd e.g. 20190101
const getDay = date => {
  return getDate(date).getDay()
}

// expected format: yyyyMMdd e.g. 20190101
const isWorkingDate = date => {
  const day = getDay(date)
  return day !== 0 && day !== 6
}

// expected format: Date Object
const isWorkingDate2 = date => {
  const day = date.getDay()
  return day !== 0 && day !== 6
}

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

  while (currentDate.getMonth() === m && currentDate.getTime() < endDateTime) {
    if (isWorkingDate2(currentDate)) workingDateCount++
    else nonWorkingDateCount++

    currentDate.setDate(++d)
  }

  return { workingDateCount, nonWorkingDateCount }
}

const getWorkingDateCountByWeek = (yearWeek, startDateStr, endDateStr) => {}

export {
  timespanDiff,
  doubleTimespanStartDate,
  isWorkingDate,
  getWorkingDateCountByMonth,
  getWorkingDateCountByWeek,
}
