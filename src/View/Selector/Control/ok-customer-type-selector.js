import { createSelect } from '../../../Utils/HtmlElementBuilder'

const PvuvPuSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: '买家',
        value: 'ok:buyer',
        selected: true,
      },
      {
        text: '卖家',
        value: 'ok:supplier',
      },
      {
        text: '买家/卖家',
        value: 'ok:buyer,ok:supplier',
      },
    ],
  })
}

PvuvPuSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({ okCustomerType: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default PvuvPuSelector
