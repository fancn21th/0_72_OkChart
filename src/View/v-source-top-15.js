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
  this.complete = false
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart1.init()
    this.chart2.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({ top15, top15DoubleTimespan }) {
    // TODO: the design below is too complex to understand
    if (top15) {
      this.chart1.render(top15DataConverter(top15))
      this.lastTop15 = top15
      if (this.lastTop15DoubleTimespan) {
        this.chart2.render(
          top15GrowthDataConverter({
            top15,
            lastTop15DoubleTimespan,
          })
        )
        this.complete = true
      }
    }
    if (top15DoubleTimespan) {
      if (this.lastTop15) {
        this.chart2.render(
          top15GrowthDataConverter({
            top15: this.lastTop15,
            top15DoubleTimespan,
          })
        )
        this.top15DoubleTimespan = top15DoubleTimespan
        this.complete = true
      }
    }
    if (this.complete) {
      this.lastTop15 = null
      this.lastTop15DoubleTimespan = null
      this.complete = false
    }
  },
}

export default View
