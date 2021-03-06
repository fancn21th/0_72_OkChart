const getIndex = (array2Check, value) => array2Check.indexOf(value)
const getIndexes = (array2check, values) =>
  values.map(value => getIndex(array2check, value))

const workingDateContext = viewData => {
  const {
    selectorData: { workingDate },
    context,
    response: {
      columnHeaders,
      query: { metrics, dimensions, sort },
    },
  } = viewData

  if (workingDate === true) {
    const { gaDateAppend } = context,
      flatColumnHeaders = columnHeaders.map(({ name }) => name),
      dateFieldIndex = getIndex(flatColumnHeaders, 'ga:date'),
      dateSumFieldIndexes = getIndexes(flatColumnHeaders, metrics)

    let filteredDimensions = dimensions.split(',')

    if (gaDateAppend) {
      filteredDimensions.shift() // TODO: bad design, assume ga:date is first one
    }

    const dateGroupFieldIndexes = getIndexes(
        flatColumnHeaders,
        filteredDimensions
      ),
      resolvedSort = sort ? sort.map(item => item.replace('-', '')) : null,
      dateSortFieldIndexes = sort
        ? getIndexes(flatColumnHeaders, resolvedSort)
        : null,
      dateSortOrders = sort
        ? sort.map(item => (item.startsWith('-') ? 'des' : 'asc'))
        : null

    return {
      ...viewData,
      context: {
        ...context,
        dateFieldIndex,
        dateGroupFieldIndexes,
        dateSumFieldIndexes, // metric field index array
        dateSortFieldIndexes,
        dateSortOrders,
      },
    }
  }

  return viewData
}

export default workingDateContext
