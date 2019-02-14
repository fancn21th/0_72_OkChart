const convert = (collection, selectorData) => {
  const collectionRange = collection.reverse().slice(0, 15)
  const timespan = parseInt(selectorData.timespan || 30)

  const collectionArray = collectionRange.map(item => ({
    item: item[0],
    count: parseInt(item[1] / timespan, 10),
  }))

  return collectionArray
}

export default convert
