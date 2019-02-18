const dateDiff = (date1, date2) => {
  var date1 = new Date(date1)
  var date2 = new Date(date2)
  var timeDiff = Math.abs(date2.getTime() - date1.getTime())
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}

const timespanDiff = (timespan, date1, date2) => {
  if (date1 && date2) return dateDiff(date1, date2)
  return timespan
}

export { timespanDiff }
