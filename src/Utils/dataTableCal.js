import { isArray } from './typeHelper'

const getSum = (array, ignoreIndexes) => {
  if (!isArray(array)) {
    throw new Error('expect an array parameter')
  }
  return array.reduce((acc, item, index) => {
    if (!ignoreIndexes.includes(index)) acc += parseInt(item, 10)
    return acc
  }, 0)
}

const withColsSum = ({ tableData, ignoreColIndexes }) => {
  if (!isArray(tableData)) {
    throw new Error('expect an array parameter')
  }
  return tableData.map(item => [...item, getSum(item, ignoreColIndexes)])
}

const withRowsSum = tableData => {
  if (!isArray(tableData)) {
    throw new Error('expect an array parameter')
  }
}

export { withColsSum, withRowsSum }
