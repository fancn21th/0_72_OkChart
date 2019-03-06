import { isInteger, isDateString } from '../typeHelper'

const getValuesByIndexs = ({ item, indexs }) => {
  return indexs.reduce((acc, idx) => {
    if (item[idx]) {
      acc.push(parseInt(item[idx], 10))
    }
    return acc
  }, [])
}

const addValuesByValues = ({ values, addedValues }) =>
  values.map((val, idx) => val + addedValues[idx])

const groupByFieldIdx = viewData => {
  const {
    context: { groupFieldIndex, sumFieldIndex },
    selectorData: { workingDate },
    responseData,
  } = viewData

  if (workingDate && isInteger(groupFieldIndex)) {
    const fixedGroupFieldIndex = workingDate
      ? groupFieldIndex + 1
      : groupFieldIndex
    const fixedSumFieldIndex = sumFieldIndex.map(idx =>
      workingDate ? idx + 1 : idx
    )

    const map = responseData.reduce((map, item) => {
        const key = item[fixedGroupFieldIndex]
        const values = getValuesByIndexs({ item, indexs: fixedSumFieldIndex })
        if (map.has(key)) {
          const oldValues = map.get(key),
            addedValues = values,
            sumValues = addValuesByValues({
              values: oldValues,
              addedValues,
            })
          map.set(key, sumValues)
        } else {
          map.set(key, values)
        }
        return map
      }, new Map()),
      arr = []

    map.forEach((values, key) => {
      arr.push([key, ...values])
    })

    return {
      ...viewData,
      responseData: arr,
    }
  }
  return viewData
}

const getSortFunc = (collection, index, order) => {
  const typeTocheck = collection[0][index]
  if (isInteger(typeTocheck)) {
    return (a, b) =>
      order === 'asc' ? a[index] - b[index] : b[index] - a[index]
  }
  if (isDateString(typeTocheck)) {
    return (a, b) => {
      const intA = parseInt(a[index], 10),
        intB = parseInt(b[index], 10)
      return order === 'asc' ? intA > intB : intB > intA
    }
  }
  // text compare
  return (a, b) => (order === 'asc' ? a[index] > b[index] : b[index] < a[index])
}

const sortByFieldIdx = viewData => {
  const {
      context: { sortField },
      selectorData: { workingDate },
      responseData,
    } = viewData,
    { index, order } = sortField && sortField[0]

  console.log(JSON.stringify(responseData))

  if (workingDate && isInteger(index)) {
    const sortFunc = getSortFunc(responseData, index, order)
    return {
      ...viewData,
      responseData: responseData.sort(sortFunc),
    }
  }
  return viewData
}

export { groupByFieldIdx, sortByFieldIdx }
