import { createCheckbox, createText } from '../../../Utils/HtmlElementBuilder'

const AccumulativeSelector = function() {
  this.selectorTitle = createText({ text: '累计计算' })
  this.selector = createCheckbox({
    checked: false,
  })
}

AccumulativeSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({
        accumulative: e.target.checked,
      })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
    parentNode.appendChild(this.selectorTitle)
  },
}

export default AccumulativeSelector
