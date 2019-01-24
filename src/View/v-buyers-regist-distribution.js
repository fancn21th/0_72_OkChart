import BuyersRegistDistributionChart from './Chart/c-buyers-regist-distribution'
import BuyersRegistDistributionSelector from './Selector/sel-buyers-regist-distribution'

const View = function({ type, chartContainerId }) {
    this.type = type // TODO: used outwards
    this.chart = new BuyersRegistDistributionChart({ chartContainerId })
    this.selector = new BuyersRegistDistributionSelector({ chartContainerId })
}

View.prototype = {
    init: function({ onSelectorChange }) {
        this.chart.init()
        this.selector.init({ onSelectorChange })
    },
    render: function(data) {
        this.chart.render(data)
    },
}

export default View