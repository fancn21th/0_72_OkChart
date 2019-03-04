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

const sortByFieldIdx = viewData => {
  const {
    context: { sumFieldIndex, sumFieldSort },
    selectorData: { workingDate },
    responseData,
  } = viewData

  const firstSumFieldIndex = sumFieldIndex && sumFieldIndex[0]

  if (workingDate && isInteger(firstSumFieldIndex)) {
    return {
      ...viewData,
      responseData: responseData.sort((a, b) => {
        return sumFieldSort === 'asc'
          ? a[firstSumFieldIndex] - b[firstSumFieldIndex]
          : b[firstSumFieldIndex] - a[firstSumFieldIndex]
      }),
    }
  }
  return viewData
}

export { groupByFieldIdx, sortByFieldIdx }
