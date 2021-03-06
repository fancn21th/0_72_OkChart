import { createSelect } from '../../../Utils/HtmlElementBuilder'

const CountryBrowserSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: '按渠道划分',
        value: 'ga:source',
        selected: true,
      },
      {
        text: '按国家划分',
        value: 'ga:country',
      },
    ],
  })
}

CountryBrowserSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({ countryBrowser: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default CountryBrowserSelector
