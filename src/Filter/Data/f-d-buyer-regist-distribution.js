const filter = ({ collection, sourceCountry }) => {
  const isSourceCountryEmpty = !sourceCountry || sourceCountry.length === 0
  return collection.filter(item => {
    return isSourceCountryEmpty || sourceCountry.includes(item[0])
  })
}

export default filter
