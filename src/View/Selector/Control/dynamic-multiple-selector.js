import { createSelect } from '../../../Utils/HtmlElementBuilder'
import {
  updateSelectOptions,
  getSelectedOptions,
} from '../../../Utils/HtmlElementHelper'
import uuidv1 from 'uuid/v1'

const DynamicMultipleSelector = function({ selectorType, placeholder }) {
  this.id = uuidv1()
  this.selector = createSelect({
    id: this.id,
    multiple: true,
    options: [],
    className: 'dynamic-multiple-selector-container',
  })
  this.selectorType = selectorType
  this.placeholder = placeholder
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
      no_results_text: '没有找到过滤项',
      placeholder_text_multiple: this.placeholder || '选择或者输入过滤项',
    })
    const self = this
    $(`#${this.id}`).on('change', function(evt, params) {
      const selected = getSelectedOptions(self.selector)
      self.onSelectorChange({ [self.selectorType]: selected, isFilter: true })
    })
  },
  render: function({ options }) {
    updateSelectOptions(this.selector, options)
    $(`#${this.id}`).trigger('chosen:updated')
  },
}

export default DynamicMultipleSelector
