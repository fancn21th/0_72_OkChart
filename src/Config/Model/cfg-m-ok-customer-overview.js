const convert = ({ responseDataSolo: { responseData } }) => {
  responseData.push(['合计', '2', '3'])
  return {
    data: responseData,
  }
}

export default {
  customConverters: [convert],
}
