const filter = ({ collection, source, country, workingDate }) => {
  const isSourceEmpty = !source || source.length === 0
  const isCountryEmpty = !country || country.length === 0
  return collection.filter(
    item =>
      (isSourceEmpty || source.includes(item[0])) &&
      (isCountryEmpty || country.includes(item[1]))
  )
}

export default filter
