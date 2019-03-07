const convert = ({
  responseDataSolo: {
    responseData: collection
  }
}) => {
  return {
    pvuv: collection.map(item => ({
      day: item[0],
      PV: parseInt(item[1], 10),
      UV: parseInt(item[2], 10),
    })),
  }
}

export default {
  customConverters: [convert],
  groupFieldIndex: 0,
  sumFieldIndex: [1, 2],
  sortField: [{
    index: 0,
    order: 'asc',
  }, ],
}
