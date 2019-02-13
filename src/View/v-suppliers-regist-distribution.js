import SuperView, { inheritPrototype } from './Base/SuperView'
import SuppliersRegistDistributionChart from './Chart/c-suppliers-regist-distribution'
import SuppliersRegistGrowthChart from './Chart/c-suppliers-regist-growth'
import SuppliersRegistDistributionSelector from './Selector/sel-suppliers-regist-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '注册卖家分布' })

  const chartId1 = 'suppliers-distribution'
  const chartId2 = 'suppliers-up'
  const chartContainer1 = createDiv(chartId1)
  const chartContainer2 = createDiv(chartId2)

  const chartWrapper = document.getElementById(this.chartWrapperId)
  chartWrapper.appendChild(chartContainer1)
  chartWrapper.appendChild(chartContainer2)

  this.chart1 = new SuppliersRegistDistributionChart({
    chartContainerId: chartId1,
  })
  this.chart2 = new SuppliersRegistGrowthChart({ chartContainerId: chartId2 })

  this.selector = new SuppliersRegistDistributionSelector({
    chartContainerId: this.selectorWrapperId,
  })
}

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
