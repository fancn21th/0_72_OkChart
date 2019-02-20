const filter = ({ collection, sourceCountry }) => {
  return collection.filter(item => {
    return (
      !sourceCountry ||
      sourceCountry.length === 0 ||
      sourceCountry.includes(item[0])
    )
  })
}

export default filter
