const convert = ({ collection }) => {
  // 全部的总数
  let totalCount = 0,
    sourceCountry = []

  collection.forEach(item => {
    totalCount += parseInt(item[1], 10)
    sourceCountry.push({
      text: item[0],
      value: item[0],
    })
  })

  return {
    distribution: collection.slice(0, 10).map(item => ({
      item: item[0],
      count: parseInt(item[1], 10),
      percent: parseInt(item[1], 10) / totalCount,
    })),
    sourceCountry,
  }
}

export default convert
