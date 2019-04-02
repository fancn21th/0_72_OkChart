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

function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7)
  var dow = simple.getDay()
  var ISOweekStart = simple
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
  return ISOweekStart
}

// Get Working Date Count By Week
const getWorkingDateCountByWeek = (yearWeek, startDateStr, endDateStr) => {
  if (yearWeek.length > 6) throw new Error('invalid year-week value')

  const year = yearWeek.substring(0, 4),
    week = yearWeek.substring(4),
    firstDateOfWeek = getDateOfISOWeek(parseInt(week), parseInt(year)),
    firstDateOfWeekTime = firstDateOfWeek.getTime(),
    lastDateOfWeek = new Date(firstDateOfWeek.valueOf())

  lastDateOfWeek.setDate(firstDateOfWeek.getDate() + 6)

  const lastDateOfWeekTime = lastDateOfWeek.getTime(),
    startDate = startDateStr ? getDate(startDateStr) : 0,
    startDateTime = startDate && startDate.getTime()

  let endDate = endDateStr ? getDate(endDateStr) : lastDateOfWeek,
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

const yearWeek = '201913',
  startDateStr = '20190301',
  endDateStr = '20190331'

console.log(getWorkingDateCountByWeek(yearWeek, startDateStr, endDateStr))
