export default {
  metrics: function({ selectorData: { okCustomerType } }) {
    return okCustomerType
  },
  dimensions: function({ selectorData: { timeUnit } }) {
    return `ok:${timeUnit || 'date'}`
  },
}
