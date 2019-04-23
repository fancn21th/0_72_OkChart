import { withColsSum, withRowsSum } from '../../Utils/dataTableCal'

const convert = ({ responseDataSolo: { responseData } }) => {
  // cal cols
  let data = withColsSum({ tableData: responseData, ignoreColIndexes: [0] })
  // cal rows
  data = withRowsSum({ tableData: data, ignoreColIndexes: [0] })
  data[data.length - 1][0] = '合计'
  return {
    data,
  }
}

export default {
  customConverters: [convert],
}
