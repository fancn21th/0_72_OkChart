import { createSelect } from '../../../Utils/HtmlElementBuilder'

const PvuvSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: 'pv',
        value: 'ga:pageviews',
        selected: true,
      },
      {
        text: 'uv',
        value: 'ga:users',
      },
    ],
  })
}

PvuvSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({ pvuv: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default PvuvSelector
