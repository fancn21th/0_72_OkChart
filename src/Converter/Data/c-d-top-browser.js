const convert = collection => {
  const collectionRange = collection.reverse().slice(0, 15)

  const collectionArray = collectionRange.map(item => ({
    item: item[0],
    count: parseInt(item[1], 10),
  }))

  return collectionArray
}

export default convert
