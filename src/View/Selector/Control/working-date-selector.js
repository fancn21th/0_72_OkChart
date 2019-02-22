import { createCheckbox, createText } from '../../../Utils/HtmlElementBuilder'

const WorkingDateSelector = function() {
  this.selectorTitle = createText({ text: '仅工作日' })
  this.selector = createCheckbox({
    checked: true,
  })
}

WorkingDateSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({
        workingDate: e.target.checked,
      })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
    parentNode.appendChild(this.selectorTitle)
  },
}

export default WorkingDateSelector
