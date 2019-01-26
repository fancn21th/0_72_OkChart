const convert = (collection, value) => {
  value.pop()
  const collectionArray = value.map(item => {
    let dataItem = null
    collection.forEach(part => {
      if (part[0] == item.item) {
        const dataValue = item.count - parseInt(part[1])
        dataItem = { item: item.item, value: dataValue }
      }
    })
    return dataItem
  })

  return collectionArray
}

export default convert
