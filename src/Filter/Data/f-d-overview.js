const filter = ({ collection, source, country }) => {
  return collection.filter(item => {
    return (
      (!source || source.length === 0 || source.includes(item[0])) &&
      (!country || country.length === 0 || country.includes(item[1]))
    )
  })
}

export default filter
