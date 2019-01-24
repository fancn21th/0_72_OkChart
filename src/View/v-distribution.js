import DistributionChart from '../View/Chart/c-distribution'
import UserGrowthChart from '../View/Chart/c-user-growth'
import DistributionSelector from '../View/Selector/sel-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ type, chartContainerId }) {
  this.type = type // TODO: used outwards
  this.chartContainerId = chartContainerId
  this.selector = new DistributionSelector({ chartContainerId })
  this.chart1 = null
  this.chart2 = null
}

View.prototype = {
  init: function({ onSelectorChange }) {
    const chartId1 = 'distribution-container'
    const chartId2 = 'user-growth-container'
    const chartContainer1 = createDiv(chartId1)
    const chartContainer2 = createDiv(chartId2)
    const chartTopContainer = document.getElementById(this.chartContainerId)
    chartTopContainer.appendChild(chartContainer1)
    chartTopContainer.appendChild(chartContainer2)

    this.chart1 = new DistributionChart({ chartContainerId: chartId1 })
    this.chart1.init()
    this.chart2 = new UserGrowthChart({ chartContainerId: chartId2 })
    this.chart2.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({ data1, data2 }) {
    if (data1) this.chart1.render(data1)
    if (data2) this.chart2.render(data2)
  },
}

export default View
