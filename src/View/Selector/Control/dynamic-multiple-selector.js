import { createSelect } from '../../../Utils/HtmlElementBuilder'
import {
  updateSelectOptions,
  getSelectedOptions,
} from '../../../Utils/HtmlElementHelper'
import uuidv1 from 'uuid/v1'

const DynamicMultipleSelector = function({ selectorType }) {
  this.id = uuidv1()
  this.selector = createSelect({
    id: this.id,
    multiple: true,
    options: [],
    className: 'dynamic-multiple-selector-container',
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
    // delay the initialization of real actor of multiple selector to appendTo stage
    //
    $(`#${this.id}`).chosen({
      no_results_text: '没有找到输入项',
    })
    const self = this
    $(`#${this.id}`).on('change', function(evt, params) {
      const selected = getSelectedOptions(self.selector)
      self.onSelectorChange({ [self.selectorType]: selected })
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
