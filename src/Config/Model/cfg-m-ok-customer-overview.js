import {
  withColsSum,
  withRowsSum,
  withRowsAccumulationValue,
} from '../../Utils/dataTableCal'

const convert = ({
  responseDataSolo: {
    response: { totalsForPreResults },
    responseData,
    selectorData: { accumulative },
  },
}) => {
  // calculate sum by cols
  // 增加最后一列合计
  let data = withColsSum({ tableData: responseData, ignoreColIndexes: [0] })
  //  calculate sum by rows
  // 增加最后一行合计
  data = withRowsSum({ tableData: data, ignoreColIndexes: [0] })
  data[data.length - 1][0] = '合计'
  const preBuyer = parseInt(totalsForPreResults['ok:buyer'], 10),
    preSupplier = parseInt(totalsForPreResults['ok:supplier'], 10),
    preData = [0, preBuyer, preSupplier, preBuyer + preSupplier]
  return {
    data: accumulative
      ? withRowsAccumulationValue({
          tableData: data,
          initData: preData,
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
