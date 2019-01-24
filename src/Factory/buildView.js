import PvUvView from '../View/v-pv-uv'
import DistributionView from '../View/v-distribution'

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
    case 'user-growth':

    default:
      return null
  }
}

export default buildView
