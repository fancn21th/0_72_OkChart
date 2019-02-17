const filter = ({ collection, source, country }) => {
  // TODO: fix bug here
  return collection.filter(item => {
    return item[0] === source || item[1] === country
  })
}

export default filter
