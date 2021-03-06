import { createSelect } from '../../../Utils/HtmlElementBuilder'

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
        value: 'isoYearIsoWeek',
      },
      {
        text: '月',
        value: 'yearMonth',
      },
    ],
  })
}

TimeUnitSelector.prototype = {
  init: function({ onSelectorChange }) {
    this.selector.onchange = function(e) {
      onSelectorChange({ timeUnit: e.target.value })
    }
  },
  appendTo: function(parentNode) {
    const spanEl = document.createElement('span')
    spanEl.innerHTML = '粒度 '
    parentNode.appendChild(spanEl)
    parentNode.appendChild(this.selector)
  },
}

export default TimeUnitSelector
