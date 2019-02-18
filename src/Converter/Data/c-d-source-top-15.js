const convert = ({ collection, timespan, startDate, endDate }) => {
  const top15 = collection.reverse().slice(0, 15)
  const days = parseInt(timespan || 30)
  return top15.map(item => ({
    item: item[0],
    count: parseInt(item[1] / days, 10),
  }))
}

export default convert
