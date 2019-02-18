const convert = ({ collection, timespan }) => {
  const collectionRange = collection.reverse().slice(0, 15)
  const days = parseInt(timespan || 30)

  const collectionArray = collectionRange.map(item => ({
    item: item[0],
    count: parseInt(item[1] / days, 10),
  }))

  return collectionArray
}

export default convert
