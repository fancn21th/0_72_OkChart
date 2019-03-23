import inheritPrototype from '../../../Utils/inheritPrototype'

function SuperSelector({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.selectorList = []
}

SuperSelector.prototype.init = function({ onSelectorChange }) {
  let query = {},
    filterKeys = []
  const onChangeHandler = data => {
    const isFilterSelector = !!data.isFilterSelector
    const isQuerySelector = !isFilterSelector
    // append selector type
    data.isQuerySelector = isQuerySelector
    data.isFilterSelector = isFilterSelector
    if (isFilterSelector) {
      Object.keys(data).forEach(key => {
        filterKeys.push(key)
      })
    } else {
      // remove all filter selector
      query = Object.keys(query).reduce((acc, key) => {
        return filterKeys.includes(key)
          ? acc
          : {
              ...acc,
              [key]: query[key],
            }
      }, {})
    }
    query = {
      ...query,
      ...data,
    }
    onSelectorChange(query)
  }
  this.selectorList.forEach(selector => {
    selector.init({ onSelectorChange: onChangeHandler })
    selector.appendTo(this.chartContainer)
  })
}

export default SuperSelector
export { inheritPrototype }
