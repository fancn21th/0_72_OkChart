import inheritPrototype from '../../../Utils/inheritPrototype'

function SuperSelector({ chartContainerId }) {
  this.chartContainerId = chartContainerId
  this.chartContainer = document.getElementById(this.chartContainerId)
  this.selectorList = []
}

SuperSelector.prototype.init = function({ onSelectorChange }) {
  let query = {}
  const onChangeHandler = data => {
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
