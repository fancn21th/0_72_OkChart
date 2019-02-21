import SuperView, { inheritPrototype } from './Base/SuperView'
import SuppliersRegistDistributionChart from './Chart/c-suppliers-regist-distribution'
import SuppliersRegistGrowthChart from './Chart/c-suppliers-regist-growth'
import SuppliersRegistDistributionSelector from './Selector/sel-suppliers-regist-distribution'
import { createDiv } from '../Utils/HtmlElementBuilder'
import supplierDistributionDataConverter from '../Converter/Data/c-d-suppliers-regist-distribution'
import supplierDistributionGrowthDataConverter from '../Converter/Data/c-d-suppliers-regist-growth'

const View = function({ chartContainerId }) {
    SuperView.call(this, { chartContainerId, title: '注册卖家分布' })

    const chartId1 = `${chartContainerId}-suppliers-distribution`
    const chartId2 = `${chartContainerId}-suppliers-up`
    const chartContainer1 = createDiv(chartId1)
    const chartContainer2 = createDiv(chartId2)

    const chartWrapper = document.getElementById(this.chartWrapperId)
    chartWrapper.appendChild(chartContainer1)
    chartWrapper.appendChild(chartContainer2)

    this.chart1 = new SuppliersRegistDistributionChart({
        chartContainerId: chartId1,
    })
    this.chart2 = new SuppliersRegistGrowthChart({ chartContainerId: chartId2 })

    this.selector = new SuppliersRegistDistributionSelector({
        chartContainerId: this.selectorWrapperId,
    })
    this.lastSupplierDistribution = null
    this.lastSupplierDistributionDoubleTimespan = null
    this.drawLastSupplierDistribution = false
    this.drawLastSupplierDistributionGrowth = false
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
        if (distribution) this.lastSupplierDistribution = distribution
        if (distributionDoubleTimespan)
            this.lastSupplierDistributionDoubleTimespan = distributionDoubleTimespan

        if (!this.drawLastSupplierDistribution && this.lastSupplierDistribution) {
            this.chart1.render(
                supplierDistributionDataConverter(this.lastSupplierDistribution)
            )
            this.drawLastSupplierDistribution = true
        }

        if (!this.drawLastSupplierDistributionGrowth &&
            this.lastSupplierDistribution &&
            this.lastSupplierDistributionDoubleTimespan
        ) {
            this.chart2.render(
                supplierDistributionGrowthDataConverter({
                    distribution: this.lastSupplierDistribution,
                    distributionDoubleTimespan: this.lastSupplierDistributionDoubleTimespan,
                })
            )
            this.drawLastSupplierDistributionGrowth = true
        }

        // this.drawLastSupplierDistributionGrowth = false
        if (
            this.drawLastSupplierDistribution &&
            this.drawLastSupplierDistributionGrowth
        ) {
            this.lastSupplierDistribution = null
            this.lastSupplierDistributionDoubleTimespan = null
            this.drawLastSupplierDistribution = false
            this.drawLastSupplierDistributionGrowth = false
        }
    },
}

export default View