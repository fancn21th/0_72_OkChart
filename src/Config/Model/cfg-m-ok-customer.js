import { withRowsAccumulationValue } from '../../Utils/dataTableCal'

const convert = ({
  responseDataSolo: {
    response: { totalsForPreResults },
    responseData,
    selectorData: { accumulative, okCustomerType },
  },
}) => {
  const twoMetrics = okCustomerType === 'ok:buyer,ok:supplier',
    preBuyer = parseInt(totalsForPreResults['ok:buyer'] || 0, 10),
    preSupplier = parseInt(totalsForPreResults['ok:supplier'] || 0, 10),
    preData = twoMetrics
      ? [0, preBuyer, preSupplier]
      : [0, preBuyer + preSupplier], // a trick there, use preBuyer + preSupplier always due to the other one must be 0
    data = accumulative
      ? withRowsAccumulationValue({
          tableData: responseData,
          initData: preData,
          ignoreColIndexes: [0],
          ignoreRowLastIndexes: [],
        })
      : responseData

  return {
    data: data.map(item => ({
      day: item[0],
      count: twoMetrics
        ? parseInt(item[1], 10) + parseInt(item[2], 10)
        : parseInt(item[1], 10),
    })),
  }
}

export default {
  customConverters: [convert],
}
