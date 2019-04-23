import { withRowsAccumulationValue } from '../../Utils/dataTableCal'

const convert = ({
  responseDataSolo: {
    responseData,
    selectorData: { accumulative },
  },
}) => {
  const data = accumulative ? withRowsAccumulationValue({
    tableData: responseData,
    ignoreColIndexes: [0],
    ignoreRowLastIndexes: [],
  }) : responseData

  return {
    data: data.map(item => ({
      day: item[0],
      count: parseInt(item[1], 10),
    })),
  }
}

export default {
  customConverters: [convert],
}
