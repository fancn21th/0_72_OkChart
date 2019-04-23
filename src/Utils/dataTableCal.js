import { isArray } from './typeHelper'

const getSum = (array, ignoreIndexes) => {
  if (!isArray(array)) {
    throw new Error('expect a parameter of array')
  }
  return array.reduce((acc, item, index) => {
    if (!ignoreIndexes.includes(index)) acc += parseInt(item, 10)
    return acc
  }, 0)
}

const mergeArrayBySum = (targetArray, mergedArray, ignoreColIndexes) => {
  if (!isArray(targetArray) || !isArray(mergedArray)) {
    throw new Error('expect a parameter of array')
  }
  const merged = targetArray.map((item, index) => {
    if (ignoreColIndexes.includes(index)) {
      return item
    }
    return item + parseInt(mergedArray[index], 10)
  })
  return merged
}

const withColsSum = ({ tableData, ignoreColIndexes }) => {
  if (!isArray(tableData)) {
    throw new Error('expect a parameter of array')
  }
  return tableData.map(item => [...item, getSum(item, ignoreColIndexes)])
}

const withRowsSum = ({ tableData, ignoreColIndexes }) => {
  if (!isArray(tableData) && tableData.length > 0) {
    throw new Error(
      'expect a parameter of array and its length is larger than 0'
    )
  }
  let lastRow = new Array(tableData[0].length)
  lastRow.fill(0)
  lastRow = tableData.reduce((acc, item) => {
    acc = mergeArrayBySum(acc, item, ignoreColIndexes)
    return acc
  }, lastRow)
  return [...tableData, lastRow]
}

export { withColsSum, withRowsSum }
