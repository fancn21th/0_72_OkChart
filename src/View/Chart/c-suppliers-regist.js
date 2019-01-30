import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

// function 1: constructor
const BuyersRegistChart = function({ chartContainerId }) {
    this.chartContainerId = chartContainerId
    this.chart = null
}

BuyersRegistChart.prototype = {
    // function 2: initialization
    init: function() {
        this.chart = new Chart({
            container: this.chartContainerId,
            forceFit: true,
            height: 400,
        })
    },
    // function 3: render
    render: function(data) {
        console.log("data");
        console.log(data);
        this.chart.clear();
        // 如何格式化坐标轴文本
        // https://www.yuque.com/antv/g2-docs/tutorial-faq#vs5rwy
        // this.chart.axis('day', {
        //   label: {
        //     formatter: val => {
        //       return `${val.slice(4, 6)}/${val.slice(6, 8)}`
        //     },
        //   },
        // })
        // 绘制折线图
        this.chart.source(data);
        this.chart.scale('suppliers', {
            min: 0
        });
        this.chart.scale('day', {
            range: [0, 1]
        });
        this.chart.tooltip({
            crosshairs: {
                type: 'line'
            }
        });
        this.chart
            .line()
            .position('day*suppliers')
            .color('#35B7FD')
            .shape('line')
        this.chart
            .point()
            .position('day*suppliers')
            .color('#35B7FD')
            .size(4)
            .shape('circle')
            .style({
                stroke: '#fff',
                lineWidth: 1,
            })

        this.chart.render()
    },
}

export default BuyersRegistChart