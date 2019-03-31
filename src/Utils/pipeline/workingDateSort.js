const getSortFunc = (index, order) => {
  return (a, b) => {
    const result = a[index] < b[index]
    return order === 'asc' ? (result ? -1 : 1) : result ? 1 : -1
  }
}

const sort = data => {
  const {
    context: { gaDateAppend, dateSortFieldIndexes, dateSortOrders },
    selectorData: { workingDate },
    responseData,
  } = data

  // TODO: only one field to sort
  if (workingDate && gaDateAppend && dateSortFieldIndexes) {
    const sortFunc = getSortFunc(dateSortFieldIndexes[0], dateSortOrders[0] - 1)
    return {
      ...data,
      responseData: responseData.sort(sortFunc),
    }
  }
  return data
}

export default sort
