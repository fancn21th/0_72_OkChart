import PvUvView from '../View/v-pv-uv'
import DistributionView from '../View/v-distribution'
import BuyersRegistView from '../View/v-buyers-regist'
import TopBrowserView from '../View/v-top-browser'
import BuyersRegistDistributionView from '../View/v-buyers-regist-distribution'
import SuppliersRegistView from '../View/v-suppliers-regist'

const buildView = ({ type, containerId }) => {
<<<<<<< HEAD
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
        case 'suppliers-regist':
            return new SuppliersRegistView({
                type,
                chartContainerId: containerId,
            })
        case 'suppliers-regist-distribution':
            return new SuppliersRegistDistributionView({
                type,
                chartContainerId: containerId,
            })
        default:
            return null
    }
=======
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
    case 'suppliers-regist':
      return new SuppliersRegistView({
        type,
        chartContainerId: containerId,
      })
    default:
      return null
  }
>>>>>>> 7bcfc1dd46f688566d7d85a45639a6dfca915933
}

export default buildView
