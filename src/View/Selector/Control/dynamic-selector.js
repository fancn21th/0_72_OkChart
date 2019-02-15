import { updateSelectOptions } from '../../../Utils/HtmlElementHelper'
import { createSelect } from '../../../Utils/HtmlElementBuilder'

const DynamicSelector = function({ selectorType }) {
  this.selector = createSelect({
    options: [],
  })
  this.selectorType = selectorType
}

DynamicSelector.prototype = {
  init: function({ onSelectorChange }) {
    const self = this
    this.selector.onchange = function(e) {
      onSelectorChange({ [self.selectorType]: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
  render: function({ options }) {
    updateSelectOptions(this.selector, options)
  },
}

export default DynamicSelector
