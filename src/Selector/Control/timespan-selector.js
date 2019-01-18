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
        value: '1weekAgo',
      },
      {
        text: '自定义',
        value: 'custom',
      },
    ],
  })
}

TimeSpanSelector.prototype = {
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default TimeSpanSelector
