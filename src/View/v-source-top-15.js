import SuperView, { inheritPrototype } from './Base/SuperView'
import SourceTop15Chart from './Chart/c-source-top-15'
import SourceTop15Growth from './Chart/c-source-top-15-growth'
import SourceTop15Selector from './Selector/sel-source-top-15'
import { createDiv } from '../Utils/HtmlElementBuilder'
import top15DataConverter from '../Converter/Data/c-d-source-top-15'
import top15GrowthDataConverter from '../Converter/Data/c-d-source-top-15-growth'

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
  this.chart2 = new SourceTop15Growth({ chartContainerId: chartId2 })

  this.selector = new SourceTop15Selector({
    chartContainerId: this.selectorWrapperId,
  })

  this.lastTop15 = null
  this.lastTop15DoubleTimespan = null
  this.drawLastTop15 = false
  this.drawLastTop15DoubleTimespan = false
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart1.init()
    this.chart2.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({ top15, top15DoubleTimespan }) {
    // TODO: complex process logic, need to be refactor
    if (top15) this.lastTop15 = top15
    if (top15DoubleTimespan) this.lastTop15DoubleTimespan = top15DoubleTimespan

    if (!this.drawLastTop15 && this.lastTop15) {
      this.chart1.render(top15DataConverter(this.lastTop15))
      this.drawLastTop15 = true
    }

    if (
      !this.drawLastTop15DoubleTimespan &&
      this.lastTop15DoubleTimespan &&
      this.lastTop15
    ) {
      this.chart2.render(
        top15GrowthDataConverter({
          top15: this.lastTop15,
          top15DoubleTimespan: this.lastTop15DoubleTimespan,
        })
      )
      this.drawLastTop15DoubleTimespan = true
    }

    if (this.drawLastTop15 && this.drawLastTop15DoubleTimespan) {
      this.lastTop15 = null
      this.lastTop15DoubleTimespan = null
      this.drawLastTop15 = false
      this.drawLastTop15DoubleTimespan = false
    }
  },
}

export default View
