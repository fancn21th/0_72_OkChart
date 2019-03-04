import { isInteger } from '../typeHelper'

const groupByFieldIdx = viewData => {
  const {
    context: { groupFieldIndex, sumFieldIndex },
    selectorData: { workingDate },
    responseData,
  } = viewData

  if (workingDate && isInteger(groupFieldIndex)) {
    const fixedGoupFieldIndex = workingDate
      ? groupFieldIndex + 1
      : groupFieldIndex
    const fixedSumFieldIndex = sumFieldIndex ? sumFieldIndex + 1 : sumFieldIndex

    const map = responseData.reduce((map, item) => {
        const key = item[fixedGoupFieldIndex]
        const value = parseInt(item[fixedSumFieldIndex], 10)
        if (map.has(key)) {
          map.set(key, map.get(key) + value)
        } else {
          map.set(key, value)
        }
        return map
      }, new Map()),
      arr = []

    map.forEach((value, key) => {
      arr.push([key, value])
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

  if (workingDate && isInteger(sumFieldIndex)) {
    return {
      ...viewData,
      responseData: responseData.sort((a, b) => {
        return sumFieldSort === 'asc'
          ? a[sumFieldIndex] - b[sumFieldIndex]
          : b[sumFieldIndex] - a[sumFieldIndex]
      }),
    }
  }
  return viewData
}

export { groupByFieldIdx, sortByFieldIdx }
