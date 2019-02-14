const convert = collection => collection.map(item => ({
  day: item[0],
  PV: parseInt(item[1], 10),
  UV: parseInt(item[2], 10)
}))

export default convert
