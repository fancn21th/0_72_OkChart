import SuperView, { inheritPrototype } from './Base/SuperView'
import DistributionChart from '../View/Chart/c-distribution'
import UserGrowthChart from '../View/Chart/c-user-growth'
import DistributionSelector from '../View/Selector/sel-distribution'
import DistributionDataConvert from '../Converter/Data/c-d-distribution'
import userGrowthDataConvert from '../Converter/Data/c-d-user-growth'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '访问分布' })

  const chartId1 = `${chartContainerId}-distribution-container`
  const chartId2 = `${chartContainerId}-user-growth-container`
  const chartContainer1 = createDiv(chartId1)
  const chartContainer2 = createDiv(chartId2)

  const chartWrapper = document.getElementById(this.chartWrapperId)
  chartWrapper.appendChild(chartContainer1)
  chartWrapper.appendChild(chartContainer2)

  this.chart1 = new DistributionChart({ chartContainerId: chartId1 })
  this.chart2 = new UserGrowthChart({ chartContainerId: chartId2 })

  this.selector = new DistributionSelector({
    chartContainerId: this.selectorWrapperId,
  })

  this.lastTop15 = null
  this.lastTop15DoubleTimespan = null
  this.drawLastTop15 = false
  this.drawLastTop15Growth = false
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart1.init()
    this.chart2.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({ top15, top15DoubleTimespan }) {
    // TODO: complex process logic, consider to refactor
    if (top15) this.lastTop15 = top15
    if (top15DoubleTimespan) this.lastTop15DoubleTimespan = top15DoubleTimespan

    if (!this.drawLastTop15 && this.lastTop15) {
      const data = DistributionDataConvert(this.lastTop15)
      const { distribution, sourceCountryFilterCollection } = data
      this.chart1.render(distribution)
      if (this.lastTop15.isDataUpdate) {
        this.selector.render({ sourceCountryFilterCollection })
      }
      this.drawLastTop15 = true
    }

    if (
      !this.drawLastTop15Growth &&
      this.lastTop15DoubleTimespan &&
      this.lastTop15
    ) {
      this.chart2.render(
        userGrowthDataConvert({
          top15: this.lastTop15,
          top15DoubleTimespan: this.lastTop15DoubleTimespan,
        })
      )
      this.drawLastTop15Growth = true
    }

    if (this.drawLastTop15 && this.drawLastTop15Growth) {
      this.lastTop15 = null
      this.lastTop15DoubleTimespan = null
      this.drawLastTop15 = false
      this.drawLastTop15Growth = false
    }
  },
}

export default View
