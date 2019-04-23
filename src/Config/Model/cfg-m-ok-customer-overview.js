import { withColsSum } from '../../Utils/dataTableCal'

const convert = ({ responseDataSolo: { responseData } }) => {
  return {
    data: withColsSum({ tableData: responseData, ignoreColIndexes: [0] }),
  }
}

export default {
  customConverters: [convert],
}
