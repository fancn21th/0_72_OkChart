import { createSelect } from '../../Utils/HtmlElementBuilder'

const TimeUnitSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: '日',
        value: 'day',
      },
      {
        text: '周',
        value: 'week',
      },
      {
        text: '月',
        value: 'month',
      },
    ],
  })
}

TimeUnitSelector.prototype = {
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default TimeUnitSelector
