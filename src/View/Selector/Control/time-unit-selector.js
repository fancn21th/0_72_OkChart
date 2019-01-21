import { createSelect } from '../../Utils/HtmlElementBuilder'

const TimeUnitSelector = function() {
  this.selector = createSelect({
    options: [
      {
        text: '日',
        value: 'date',
        selected: true,
      },
      {
        text: '周',
        value: 'yearWeek',
      },
      {
        text: '月',
        value: 'yearMonth',
      },
    ],
  })
}

TimeUnitSelector.prototype = {
  init: function({ onChange }) {
    this.selector.onchange = function(e) {
      onChange({ timeUnit: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    parentNode.appendChild(this.selector)
  },
}

export default TimeUnitSelector