import { createSelect } from '../../../Utils/HtmlElementBuilder'

const PvuvPuSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: 'PV',
        value: 'ga:pageviews',
        selected: true,
      },
      {
        text: 'UV',
        value: 'ga:users',
      },
      {
        text: 'PV/UV',
        value: 'ga:pageviews,ga:users',
      },
    ],
  })
}

PvuvPuSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({ pvuv: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default PvuvPuSelector
