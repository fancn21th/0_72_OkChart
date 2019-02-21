import SuperView, { inheritPrototype } from './Base/SuperView'
import BuyersRegistDistributionChart from './Chart/c-buyers-regist-distribution'
import BuyersRegistGrowthChart from './Chart/c-buyers-regist-growth'
import BuyersRegistDistributionSelector from './Selector/sel-buyers-regist-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'
import buyerDistributionDataConverter from '../Converter/Data/c-d-buyers-regist-distribution'
import buyerDistributionGrowthDataConverter from '../Converter/Data/c-d-buyers-regist-distribution-growth'

const View = function({ chartContainerId }) {
    SuperView.call(this, { chartContainerId, title: '注册买家分布' })

    const chartId1 = `${chartContainerId}-container`
    const chartId2 = `${chartContainerId}-growth-container`
    const chartContainer1 = createDiv(chartId1)
    const chartContainer2 = createDiv(chartId2)

    const chartWrapper = document.getElementById(this.chartWrapperId)
    chartWrapper.appendChild(chartContainer1)
    chartWrapper.appendChild(chartContainer2)

    this.chart1 = new BuyersRegistDistributionChart({
        chartContainerId: chartId1,
    })
    this.chart2 = new BuyersRegistGrowthChart({ chartContainerId: chartId2 })

    this.selector = new BuyersRegistDistributionSelector({
        chartContainerId: this.selectorWrapperId,
    })

    this.lastBuyerDistribution = null
    this.lastBuyerDistributionDoubleTimespan = null
    this.drawLastBuyerDistribution = false
    this.drawLastBuyerDistributionGrowth = false
}

inheritPrototype(View, SuperView)

View.prototype = {
    init: function({ onSelectorChange }) {
        this.chart1.init()
        this.chart2.init()
        this.selector.init({ onSelectorChange })
    },
    render: function({ distribution, distributionDoubleTimespan }) {
        // TODO: complex process logic, consider to refactor
        if (distribution) this.lastBuyerDistribution = distribution
        if (distributionDoubleTimespan)
            this.lastBuyerDistributionDoubleTimespan = distributionDoubleTimespan

        if (!this.drawLastBuyerDistribution && this.lastBuyerDistribution) {
            this.chart1.render(
                buyerDistributionDataConverter(this.lastBuyerDistribution)
            )
            this.drawLastBuyerDistribution = true
        }

        if (!this.drawLastBuyerDistributionGrowth &&
            this.lastBuyerDistribution &&
            this.lastBuyerDistributionDoubleTimespan
        ) {
            this.chart2.render(
                buyerDistributionGrowthDataConverter({
                    distribution: this.lastBuyerDistribution,
                    distributionDoubleTimespan: this.lastBuyerDistributionDoubleTimespan,
                })
            )
            this.drawLastBuyerDistributionGrowth = true
        }

        // this.drawLastBuyerDistributionGrowth = false
        if (
            this.drawLastBuyerDistribution &&
            this.drawLastBuyerDistributionGrowth
        ) {
            this.lastBuyerDistribution = null
            this.lastBuyerDistributionDoubleTimespan = null
            this.drawLastBuyerDistribution = false
            this.drawLastBuyerDistributionGrowth = false
        }
    },
}

export default View