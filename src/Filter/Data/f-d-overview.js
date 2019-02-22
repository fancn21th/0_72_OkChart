const filter = ({ collection, source, country, workingDate }) => {
  const isSourceEmpty = !source || source.length === 0,
    isCountryEmpty = !country || country.length === 0,
    idxOffset = workingDate === false ? 1 : 0,
    channelIdx = 0 + idxOffset,
    countryIdx = 1 + idxOffset

  return collection.filter(
    item =>
      (isSourceEmpty || source.includes(item[channelIdx])) &&
      (isCountryEmpty || country.includes(item[countryIdx]))
  )
}

export default filter
