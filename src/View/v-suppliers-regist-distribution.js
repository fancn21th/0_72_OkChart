import SuppliersRegistDistributionChart from './Chart/c-suppliers-regist-distribution'
import SuppliersRegistGrowthChart from './Chart/c-suppliers-regist-growth'
import SuppliersRegistDistributionSelector from './Selector/sel-suppliers-regist-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ type, chartContainerId }) {
    this.type = type // TODO: used outwards
    this.chartContainerId = chartContainerId
    this.selector = new SuppliersRegistDistributionSelector({ chartContainerId })
    this.chart1 = null
    this.chart2 = null
}

View.prototype = {
    init: function({ onSelectorChange }) {
        const chartId1 = "suppliers-distribution";
        const chartId2 = "suppliers-up";
        // 创建两个图表的容器
        const chartContainer1 = createDiv(chartId1);
        const chartContainer2 = createDiv(chartId2);
        const chartTopContainer = document.getElementById(this.chartContainerId);
        chartTopContainer.appendChild(chartContainer1);
        chartTopContainer.appendChild(chartContainer2);

        this.chart1 = new SuppliersRegistDistributionChart({ chartContainerId: chartId1 });
        this.chart1.init();
        this.chart2 = new SuppliersRegistGrowthChart({ chartContainerId: chartId2 });
        this.chart2.init();

        this.selector.init({ onSelectorChange })
    },
    render: function({ data1, data2 }) {
        if (data1) this.chart1.render(data1)
        if (data2) this.chart2.render(data2)
    },
}

export default View