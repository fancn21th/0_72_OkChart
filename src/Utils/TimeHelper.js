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

const getDay = date => {
  const dateArray = date.split('')
  dateArray.splice(4, 0, '-')
  dateArray.splice(7, 0, '-')
  return new Date(dateArray.join('')).getDay()
}

const isWorkingDate = date => {
  const day = getDay(date)
  return day !== 0 && day !== 6
}

export { timespanDiff, doubleTimespanStartDate, isWorkingDate }
