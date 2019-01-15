const convert = collection => collection.map(item => ({
  day: item[0],
  pv: parseInt(item[1], 10),
  uv: parseInt(item[2], 10)
}))

export default convert
