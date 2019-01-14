const convert = collection => collection.map(item => ({
  day: item[0],
  value: parseInt(item[1], 10)
}))

export default convert
