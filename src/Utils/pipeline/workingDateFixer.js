import { isInteger } from '../typeHelper'

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

const getSortFunc = (index, order) => {
  return (a, b) => {
    const result = a[index] < b[index]
    return order === 'asc' ? (result ? -1 : 1) : result ? 1 : -1
  }
}

const sortByFieldIdx = viewData => {
  const {
    context: { sortField },
    selectorData: { workingDate },
    responseData,
  } = viewData

  if (workingDate && sortField) {
    const { index, order } = sortField && sortField[0],
      sortFunc = getSortFunc(index, order)
    return {
      ...viewData,
      responseData: responseData.sort(sortFunc),
    }
  }
  return viewData
}

const fixWorkingDate = data => {
  debugger
}

export default fixWorkingDate
