import { isDateString, isDate } from './typeHelper'

const dateDiff = (startDate, endDate) => {
  const date1 = new Date(startDate)
  const date2 = new Date(endDate)
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

// expected format:
//  startDate  yyyy-MM-dd e.g. 2019-01-01
//  endDate  yyyy-MM-dd e.g. 2019-01-01
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
  if (!date) return null
  const dateArray = date.split('')
  dateArray.splice(4, 0, '-')
  dateArray.splice(7, 0, '-')
  return new Date(dateArray.join(''))
}

// expected format: Date Object
const isWorkingDate2 = date => {
  const day = date.getDay()
  return day !== 0 && day !== 6
}

// expected format: yyyyMMdd e.g. 20190101
const isWorkingDate = dateStr => {
  return isWorkingDate2(getDate(dateStr))
}

// refer to https://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7)
  var dow = simple.getDay()
  var ISOweekStart = simple
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
  return ISOweekStart
}

// expected format:
//  startDateStr: yyyyMMdd e.g. 20190101
//  endDateStr: yyyyMMdd e.g. 20190101
const getWorkingDateCountByMonth = (yearMonth, startDate, endDate) => {
  let startingDate = isDate(startDate)
      ? startDate
      : isDateString(startDate)
      ? getDate(startDate)
      : null,
    endingDate = isDate(endDate)
      ? endDate
      : isDateString(endDate)
      ? getDate(endDate)
      : null

  return _getWorkingDateCountByMonth(yearMonth, startingDate, endingDate)
}

const _getWorkingDateCountByMonth = (yearMonth, startingDate, endingDate) => {
  if (yearMonth.length > 6) throw new Error('invalid year-month value')

  const year = yearMonth.substring(0, 4),
    month = yearMonth.substring(4),
    m = parseInt(month) - 1, // month is 0-based
    startDate = startingDate ? startingDate : 0,
    startDateTime = startDate && startDate.getTime(),
    endDate = endingDate ? endingDate : new Date(year, parseInt(month), 1),
    endDateTime = endDate.getTime() + 8 * 3600, // default 8 hours offset
    firstDateOfMonth = new Date(year, m, 1),
    firstDateOfMonthTime = firstDateOfMonth.getTime()

  let currentDate =
      startDateTime > firstDateOfMonthTime ? startDate : firstDateOfMonth,
    workingDateCount = 0,
    nonWorkingDateCount = 0,
    d = currentDate.getDate()

  while (currentDate.getMonth() === m && currentDate.getTime() < endDateTime) {
    if (isWorkingDate2(currentDate)) workingDateCount++
    else nonWorkingDateCount++

    currentDate.setDate(++d)
  }

  return { workingDateCount, nonWorkingDateCount }
}

// expected format:
//  startDateStr: yyyyMMdd e.g. 20190101
//  endDateStr: yyyyMMdd e.g. 20190101
const getWorkingDateCountByWeek = (yearWeek, startDate, endDate) => {
  let startingDate = isDate(startDate)
      ? startDate
      : isDateString(startDate)
      ? getDate(startDate)
      : null,
    endingDate = isDate(endDate)
      ? endDate
      : isDateString(endDate)
      ? getDate(endDate)
      : null

  return _getWorkingDateCountByWeek(yearWeek, startingDate, endingDate)
}

const _getWorkingDateCountByWeek = (yearWeek, startingDate, endingDate) => {
  if (yearWeek.length > 6) throw new Error('invalid year-week value')

  const year = yearWeek.substring(0, 4),
    week = yearWeek.substring(4),
    firstDateOfWeek = getDateOfISOWeek(parseInt(week), parseInt(year)),
    firstDateOfWeekTime = firstDateOfWeek.getTime(),
    lastDateOfWeek = new Date(firstDateOfWeek.valueOf())

  lastDateOfWeek.setDate(firstDateOfWeek.getDate() + 6)

  const lastDateOfWeekTime = lastDateOfWeek.getTime(),
    startDate = startingDate ? startingDate : 0,
    startDateTime = startDate && startDate.getTime()

  let endDate = endingDate ? endingDate : lastDateOfWeek,
    endDateTime = endDate.getTime() + 8 * 3600

  endDate = endDateTime < lastDateOfWeekTime ? endDate : lastDateOfWeek
  endDateTime = endDate.getTime() + 8 * 3600

  let currentDate =
      startDateTime > firstDateOfWeekTime ? startDate : firstDateOfWeek,
    workingDateCount = 0,
    nonWorkingDateCount = 0,
    d = currentDate.getDate()

  while (currentDate.getTime() < endDateTime) {
    if (isWorkingDate2(currentDate)) workingDateCount++
    else nonWorkingDateCount++

    currentDate.setDate(++d)
  }

  return { workingDateCount, nonWorkingDateCount }
}

const getStartEndDateStrByTimespan = timespan => {
  if (!timespan) throw new Error('unexpected timespan')

  const timespanCount = parseInt(timespan, 10),
    startingDate = new Date(),
    endingDate = new Date(startingDate.valueOf())
  startingDate.setDate(startingDate.getDate() - timespanCount)
  endingDate.setDate(endingDate.getDate() - 1)
  return {
    startDate: startingDate,
    endDate: endingDate,
  }
}

export {
  timespanDiff,
  doubleTimespanStartDate,
  isWorkingDate,
  getWorkingDateCountByMonth,
  getWorkingDateCountByWeek,
  getStartEndDateStrByTimespan,
}
