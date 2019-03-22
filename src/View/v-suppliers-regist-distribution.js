import SuperView, { inheritPrototype } from './Base/SuperView'
import SuppliersRegistDistributionChart from './Chart/c-suppliers-regist-distribution'
import SuppliersRegistGrowthChart from './Chart/c-suppliers-regist-growth'
import SuppliersRegistDistributionSelector from './Selector/sel-suppliers-regist-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '注册卖家分布' })

  const chartId1 = `${chartContainerId}-container`
  const chartId2 = `${chartContainerId}-growth-container`
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

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart1.init()
    this.chart2.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({
    distribution,
    distributionGrowth,
    sourceCountryFilterCollection,
    isResponseDataFromCache,
  }) {
    this.chart1.render(distribution)
    this.chart2.render(distributionGrowth)
    // no need to update selector when fetching data from cache
    if (!isResponseDataFromCache) {
      this.selector.render({
        sourceCountryFilterCollection,
      })
    }
  },
}

export default View
