import SuperView, { inheritPrototype } from './Base/SuperView'
import BuyersRegistDistributionChart from './Chart/c-buyers-regist-distribution'
import BuyersRegistGrowthChart from './Chart/c-buyers-regist-growth'
import BuyersRegistDistributionSelector from './Selector/sel-buyers-regist-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '注册买家分布' })

  const chartId1 = 'buyers-distribution'
  const chartId2 = 'buyers-up'
  const chartContainer1 = createDiv(chartId1)
  const chartContainer2 = createDiv(chartId2)

  const chartWrapper = document.getElementById(this.chartWrapperId)
  chartWrapper.appendChild(chartContainer1)
  chartWrapper.appendChild(chartContainer2)

  this.chart1 = new BuyersRegistDistributionChart({
    chartContainerId: chartId1,
  })
  this.chart2 = new BuyersRegistGrowthChart({ chartContainerId: chartId2 })

  this.selector = new BuyersRegistDistributionSelector({
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
  render: function({ data1, data2 }) {
    if (data1) this.chart1.render(data1)
    if (data2) this.chart2.render(data2)
  },
}

export default View
