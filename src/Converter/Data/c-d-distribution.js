const convert = collection => {
  let userTotalCount = 0
  let userOthersCount = 0
  collection.forEach(item => {
    userTotalCount = userTotalCount + parseInt(item[1])
  })

  const collectionRange = collection.reverse().slice(0, 10)

  const collectionArray = collectionRange.map(item => ({
    item: item[0],
    count: parseInt(item[1], 10),
    percent: parseInt((item[1] * 10000) / userTotalCount) / 10000,
  }))

  collectionArray.forEach(item => {
    userOthersCount = userOthersCount + item['count']
  })

  collectionArray.push({
    item: 'others',
    count: userOthersCount,
    percent:
      parseInt(((userTotalCount - userOthersCount) * 10000) / userTotalCount) /
      10000,
  })

  return collectionArray
}

export default convert