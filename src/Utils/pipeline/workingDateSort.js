const getSortFunc = (index, order) => {
  return (a, b) => {
    const result = a[index] < b[index]
    return order === 'asc' ? (result ? -1 : 1) : result ? 1 : -1
  }
}

const sort = data => {
  const {
    context: { dateSortFieldIndex },
    selectorData: { workingDate },
    responseData,
  } = data

  if (workingDate && dateSortFieldIndex) {
    const { index, order } = sortField && sortField[0],
      sortFunc = getSortFunc(index, order)
    return {
      ...data,
      responseData: responseData.sort(sortFunc),
    }
  }
  return data
}

export default sort
