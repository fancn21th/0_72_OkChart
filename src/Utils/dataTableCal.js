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
    return parseInt(item, 10) + parseInt(mergedArray[index], 10)
  })
  return merged
}

// append a column of sum values of each item ahead of the row at the end of the table
const withColsSum = ({ tableData, ignoreColIndexes }) => {
  if (!isArray(tableData)) {
    throw new Error('expect a parameter of array')
  }
  return tableData.map(item => [...item, getSum(item, ignoreColIndexes)])
}

// append a row of sum values of every item in each column at very bottom of the table
const withRowsSum = ({ tableData, ignoreColIndexes }) => {
  if (!isArray(tableData) || tableData.length <= 0) {
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

const withRowsAccumulationValue = ({
  tableData,
  initData, // tableData will be calculated based on initData
  ignoreColIndexes,
  ignoreRowLastIndexes,
}) => {
  if (!isArray(tableData) || tableData.length <= 0) {
    throw new Error(
      'expect a parameter of array and its length is larger than 0'
    )
  }
  let sums = initData || new Array(tableData[0].length).fill(0)
  return tableData.map((row, rowIndex) => {
    const lastRowIndex = tableData.length - (rowIndex + 1)
    // current row is not ignored
    if (!ignoreRowLastIndexes.includes(lastRowIndex)) {
      sums = mergeArrayBySum(row, sums, ignoreColIndexes)
      return sums
    }
    // current row is ignore then append initData if provided
    return mergeArrayBySum(row, initData, ignoreColIndexes)
  })
}

export { withColsSum, withRowsSum, withRowsAccumulationValue }
