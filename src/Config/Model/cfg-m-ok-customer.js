const convert = ({ responseDataSolo: { responseData } }) => {
  return {
    data: responseData.map(item => ({
      day: item[0],
      count: parseInt(item[1], 10),
    })),
  }
}

export default {
  customConverters: [convert],
}
