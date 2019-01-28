import PvUvView from '../View/v-pv-uv'
import DistributionView from '../View/v-distribution'
import BuyersRegistView from '../View/v-buyers-regist'
import TopBrowserView from '../View/v-top-browser'
import BuyersRegistDistributionView from '../View/v-buyers-regist-distribution'

const buildView = ({ type, containerId }) => {
  switch (type) {
    case 'pv-uv':
      return new PvUvView({
        type,
        chartContainerId: containerId,
      })
    case 'distribution':
      return new DistributionView({
        type,
        chartContainerId: containerId,
      })
    case 'top-browser':
      return new TopBrowserView({
        type,
        chartContainerId: containerId,
      })
    case 'buyers-regist':
      return new BuyersRegistView({
        type,
        chartContainerId: containerId,
      })
    case 'buyers-regist-distribution':
      return new BuyersRegistDistributionView({
        type,
        chartContainerId: containerId,
      })
    case 'user-growth':

    default:
      return null
  }
}

export default buildView
