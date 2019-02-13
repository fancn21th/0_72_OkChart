import BuyersRegistDistributionChart from './Chart/c-buyers-regist-distribution'
import BuyersRegistGrowthChart from './Chart/c-buyers-regist-growth'
import BuyersRegistDistributionSelector from './Selector/sel-buyers-regist-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'

const View = function({ chartContainerId }) {
    this.chartContainerId = chartContainerId
    this.selector = new BuyersRegistDistributionSelector({ chartContainerId })
    this.chart1 = null
    this.chart2 = null
}

View.prototype = {
    init: function({ onSelectorChange }) {
        const chartId1 = "buyers-distribution";
        const chartId2 = "buyers-up";
        // 创建两个图表的容器
        const chartContainer1 = createDiv(chartId1);
        const chartContainer2 = createDiv(chartId2);
        const chartTopContainer = document.getElementById(this.chartContainerId);
        chartTopContainer.appendChild(chartContainer1);
        chartTopContainer.appendChild(chartContainer2);

        this.chart1 = new BuyersRegistDistributionChart({ chartContainerId: chartId1 });
        this.chart1.init();
        this.chart2 = new BuyersRegistGrowthChart({ chartContainerId: chartId2 });
        this.chart2.init();

        this.selector.init({ onSelectorChange })
    },
    render: function({ data1, data2 }) {
        if (data1) this.chart1.render(data1)
        if (data2) this.chart2.render(data2)
    },
}

export default View
