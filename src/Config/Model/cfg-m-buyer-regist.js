const convert = ({
  responseDataSolo: {
    responseData: collection
  }
}) => {
  return {
    data: collection.map(item => ({
      day: item[0],
      buyers: parseInt(item[1], 10),
    }))
  }
}
export default {
  customConverters: [convert],
  groupFieldIndex: 0,
  sumFieldIndex: [1],
  sortField: [{
    index: 0,
    order: 'asc',
  }, ],
}
