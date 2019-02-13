import SuppliersRegistChart from './Chart/c-suppliers-regist'
import SuppliersRegistSelector from './Selector/sel-suppliers-regist'

const View = function({ chartContainerId }) {
    this.chart = new SuppliersRegistChart({ chartContainerId })
    this.selector = new SuppliersRegistSelector({ chartContainerId })
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
