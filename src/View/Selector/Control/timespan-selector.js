import { createSelect } from '../../Utils/HtmlElementBuilder'

const TimeSpanSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: '最近一日',
        value: '1',
      },
      {
        text: '最近一周',
        value: '7',
      },
      {
        text: '最近一月',
        value: '30',
      },
      {
        text: '自定义',
        value: 'custom',
      },
    ],
  })
}

TimeSpanSelector.prototype = {
  init: function({ onChange }) {
    this.selector.onchange = function(e) {
      onChange({ timespan: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default TimeSpanSelector
