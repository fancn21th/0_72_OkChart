const convert = ({ responseDataSolo: { responseData } }) => {
  return {
    data: responseData,
  }
}

export default {
  customConverters: [convert],
}
