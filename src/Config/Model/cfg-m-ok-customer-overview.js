import {
  withColsSum,
  withRowsSum,
  withRowsAccumulationValue,
} from '../../Utils/dataTableCal'

const convert = ({
  responseDataSolo: {
    responseData,
    selectorData: { accumulative },
  },
}) => {
  // cal cols
  let data = withColsSum({ tableData: responseData, ignoreColIndexes: [0] })
  // cal rows
  data = withRowsSum({ tableData: data, ignoreColIndexes: [0] })
  data[data.length - 1][0] = '合计'
  return {
    data: accumulative
      ? withRowsAccumulationValue({
          tableData: data,
          ignoreColIndexes: [0],
          ignoreRowLastIndexes: [0],
        })
      : data,
    // data,
  }
}

export default {
  customConverters: [convert],
}
