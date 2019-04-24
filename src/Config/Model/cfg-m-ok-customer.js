import { withRowsAccumulationValue } from '../../Utils/dataTableCal'

const convert = ({
  responseDataSolo: {
    responseData,
    selectorData: { accumulative, okCustomerType },
  },
}) => {
  const data = accumulative
    ? withRowsAccumulationValue({
        tableData: responseData,
        ignoreColIndexes: [0],
        ignoreRowLastIndexes: [],
      })
    : responseData

  const twoMetrics = okCustomerType === 'ok:buyer,ok:supplier'

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
