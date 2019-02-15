const filter = ({ collection, source, country }) => {
  return collection.filter(item => {
    return item[0] === source || item[1] === country
  })
}

export default filter
