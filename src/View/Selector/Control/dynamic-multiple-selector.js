import { createSelect } from '../../../Utils/HtmlElementBuilder'
import { updateSelectOptions } from '../../../Utils/HtmlElementHelper'
import uuidv1 from 'uuid/v1'

const DynamicMultipleSelector = function({ selectorType }) {
  this.id = uuidv1()
  this.selector = createSelect({
    id: this.id,
    multiple: true,
    options: [
      {
        text: 'A',
        value: 'a',
        selected: true,
      },
      {
        text: 'B',
        value: 'b',
      },
      {
        text: 'C',
        value: 'c',
      },
    ],
  })
  this.selectorType = selectorType
}

DynamicMultipleSelector.prototype = {
  init: function({ onSelectorChange }) {},
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
    $(`#${this.id}`).chosen({ no_results_text: '没有找到输入项' })
  },
  render: function({ options }) {
    updateSelectOptions(this.selector, options)
  },
}

export default DynamicMultipleSelector
