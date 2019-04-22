import OverviewView from '../View/v-overview'
import PvUvView from '../View/v-pv-uv'
import DistributionView from '../View/v-distribution'
import BuyersRegistView from '../View/v-buyers-regist'
import SourceTop15View from '../View/v-source-top-15'
import BuyersRegistDistributionView from '../View/v-buyers-regist-distribution'
import SuppliersRegistView from '../View/v-suppliers-regist'
import SuppliersRegistDistributionView from '../View/v-suppliers-regist-distribution'
import OkCustomerOverviewView from '../View/v-ok-customer-overview'

const buildView = ({ type, containerId }) => {
  switch (type) {
    case 'ok-customer-overview':
      return new OkCustomerOverviewView({
        chartContainerId: containerId,
      })
    case 'overview':
      return new OverviewView({
        chartContainerId: containerId,
      })
    case 'pv-uv':
      return new PvUvView({
        chartContainerId: containerId,
      })
    case 'distribution':
      return new DistributionView({
        chartContainerId: containerId,
      })
    case 'source-top-15':
      return new SourceTop15View({
        chartContainerId: containerId,
      })
    case 'buyers-regist':
      return new BuyersRegistView({
        chartContainerId: containerId,
      })
    case 'buyers-regist-distribution':
      return new BuyersRegistDistributionView({
        chartContainerId: containerId,
      })
    case 'suppliers-regist':
      return new SuppliersRegistView({
        chartContainerId: containerId,
      })
    case 'suppliers-regist-distribution':
      return new SuppliersRegistDistributionView({
        chartContainerId: containerId,
      })
    default:
      throw new Error('OKCHART::ERROR:: no view is defined.')
  }
}

export default buildView
