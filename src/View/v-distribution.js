import SuperView, { inheritPrototype } from './Base/SuperView'
import DistributionChart from '../View/Chart/c-distribution'
import UserGrowthChart from '../View/Chart/c-user-growth'
import DistributionSelector from '../View/Selector/sel-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ chartContainerId }) {
  SuperView.call(this, {
    chartContainerId,
    title: '访问分布',
  })

  const chartId1 = `${chartContainerId}-distribution-container`
  const chartId2 = `${chartContainerId}-user-growth-container`
  const chartContainer1 = createDiv(chartId1)
  const chartContainer2 = createDiv(chartId2)

  const chartWrapper = document.getElementById(this.chartWrapperId)
  chartWrapper.appendChild(chartContainer1)
  chartWrapper.appendChild(chartContainer2)

  this.chart1 = new DistributionChart({
    chartContainerId: chartId1,
  })
  this.chart2 = new UserGrowthChart({
    chartContainerId: chartId2,
  })

  this.selector = new DistributionSelector({
    chartContainerId: this.selectorWrapperId,
  })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart1.init()
    this.chart2.init()
    this.selector.init({
      onSelectorChange,
    })
  },
  render: function({
    distribution,
    distributionGrowth,
    sourceCountryFilterCollection,
    responseDataArray: [first],
  }) {
    this.chart1.render(distribution)
    this.chart2.render(distributionGrowth)
    if (first.selectorData.isQuerySelector) {
      this.selector.render({
        sourceCountryFilterCollection,
      })
    }
  },
}

export default View
