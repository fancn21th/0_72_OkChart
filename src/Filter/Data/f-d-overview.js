const filter = ({ collection, source, country }) => {
  // TODO: fix bug here
  return collection.filter(item => {
    return (
      (!source || source.includes(item[0])) &&
      (!country || country.includes(item[1]))
    )
  })
}

export default filter
