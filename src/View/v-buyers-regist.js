import BuyersRegistChart from './Chart/c-buyers-regist'
import BuyersRegistSelector from './Selector/sel-buyers-regist'

const View = function({ type, chartContainerId }) {
    this.type = type // TODO: used outwards
    this.chart = new BuyersRegistChart({ chartContainerId })
    this.selector = new BuyersRegistSelector({ chartContainerId })
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