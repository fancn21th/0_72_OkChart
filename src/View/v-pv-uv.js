import SuperView, { inheritPrototype } from './Base/SuperView'
import PvUvChart from '../View/Chart/c-pv-uv'
import PvUvSelector from '../View/Selector/sel-pv-uv'

const View = function({ chartContainerId }) {
  SuperView.call(this, { chartContainerId, title: '用户访问数' })
  this.chart = new PvUvChart({ chartContainerId: this.chartWrapperId })
  this.selector = new PvUvSelector({ chartContainerId: this.selectorWrapperId })
}

inheritPrototype(View, SuperView)

View.prototype = {
  init: function({ onSelectorChange }) {
    this.chart.init()
    this.selector.init({ onSelectorChange })
  },
  render: function({
    pvuv,
    sourceFilterCollection,
    countryFilterCollection,
    responseDataSolo: {
      selectorData: { isQuerySelector },
    },
  }) {
    this.chart.render(pvuv)
    if (isQuerySelector) {
      this.selector.render({
        sourceFilterCollection,
        countryFilterCollection,
      })
    }
  },
}

export default View
