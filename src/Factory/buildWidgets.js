import PvUvChart from '../View/Chart/c-pv-uv'

const buildWidget = chart => {
  switch (chart.type) {
    case 'pv-uv':
      return new PvUvChart(chart.container)
    default:
      return null
  }
}

const buildWidgets = charts => {
  charts.map(chart => buildWidget(chart))
}

export default buildWidgets
