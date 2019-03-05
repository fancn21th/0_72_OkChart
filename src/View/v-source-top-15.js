import SuperView, { inheritPrototype } from './Base/SuperView'
import SourceTop15Chart from './Chart/c-source-top-15'
import SourceTop15GrowthChart from './Chart/c-source-top-15-growth'
import SourceTop15Selector from './Selector/sel-source-top-15'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '来源排名' })

  const chartId1 = `${chartContainerId}-container`
  const chartId2 = `${chartContainerId}-growth-container`
  const chartContainer1 = createDiv(chartId1)
  const chartContainer2 = createDiv(chartId2)

  const chartWrapper = document.getElementById(this.chartWrapperId)
  chartWrapper.appendChild(chartContainer1)
  chartWrapper.appendChild(chartContainer2)

  this.chart1 = new SourceTop15Chart({ chartContainerId: chartId1 })
  this.chart2 = new SourceTop15GrowthChart({ chartContainerId: chartId2 })

  this.selector = new SourceTop15Selector({
    chartContainerId: this.selectorWrapperId,
  })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart1.init()
    this.chart2.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({ top15, top15Growth }) {
    this.chart1.render(top15)
    this.chart2.render(top15Growth)
  },
}

export default View
