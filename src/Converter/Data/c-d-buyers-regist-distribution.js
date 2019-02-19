const convert = ({ collection }) => {
  // 全部的总数
  var totalCount = 0

  collection.forEach(item => {
    totalCount += parseInt(item[1], 10)
  })

  var top10 = collection.slice(0, 10).map(item => ({
    item: item[0],
    count: parseInt(item[1], 10),
    percent: parseInt(item[1], 10) / totalCount,
  }))

  return top10
}

export default convert
