const convert = collection => collection.map(item => ({
  day: item[0],
  value: item[1]
}))

export default convert
