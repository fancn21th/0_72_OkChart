import { updateSelectOptions } from '../../../Utils/HtmlElementHelper'
import { createSelect } from '../../../Utils/HtmlElementBuilder'

const DynamicSelector = function() {
  this.selector = createSelect({
    options: [],
  })
}

DynamicSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({ countryBrowser: e.target.value })
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
