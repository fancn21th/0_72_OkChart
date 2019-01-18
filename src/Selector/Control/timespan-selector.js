import { createSelect } from '../../Utils/HtmlElementBuilder'

const TimeSpanSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: '最近一日',
        value: '1dayAgo',
      },
      {
        text: '最近一周',
        value: '1weekAgo',
      },
      {
        text: '最近一月',
        value: '1monthAgo',
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
