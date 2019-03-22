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
    const currentSearchIsFilter = !!data.isFilter
    if (currentSearchIsFilter) {
      delete data.isFilter
      Object.keys(data).forEach(key => {
        filterKeys.push(key)
      })
    } else {
      // remove filterKeys from query when user perform no-filter select action
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
