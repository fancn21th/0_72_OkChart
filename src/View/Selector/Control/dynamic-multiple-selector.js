import { createSelect } from '../../../Utils/HtmlElementBuilder'
import { updateSelectOptions } from '../../../Utils/HtmlElementHelper'
import uuidv1 from 'uuid/v1'

const DynamicMultipleSelector = function({ selectorType }) {
  this.id = uuidv1()
  this.selector = createSelect({
    id: this.id,
    multiple: true,
    options: [],
  })
  this.selectorType = selectorType
  this.onSelectorChange = null
}

DynamicMultipleSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.onSelectorChange = onSelectorChange
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
    $(`#${this.id}`).chosen({ no_results_text: '没有找到输入项' })
    const self = this
    $(`#${this.id}`).on('change', function(evt, params) {
      self.onSelectorChange({ [self.selectorType]: params })
    })
  },
  render: function({ options }) {
    updateSelectOptions(
      this.selector,
      options.map(item => ({
        ...item,
        selected: true,
      }))
    )
    $(`#${this.id}`).trigger('chosen:updated')
  },
}

export default DynamicMultipleSelector
