const convert = (collection, value, selectorData) => {
  const timespan = parseInt(selectorData.timespan || 30)
  value.pop()
  const collectionArray = value.map(item => {
    let dataItem = { item: item.item, value: item.count }
    collection.forEach(part => {
      if (part[0] == item.item) {
        const dataValue = item.count - parseInt(part[1] / timespan)
        dataItem = { item: item.item, value: dataValue }
      }
    })
    return dataItem
  })

  return collectionArray
}

export default convert
