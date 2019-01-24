import PvModel from '../Model/m-pv-uv'
import DistributionModel from '../Model/m-distribution'

const buildModel = ({ type, query }) => {
  switch (type) {
    case 'pv-uv':
      return new PvModel(query)
    case 'distribution':
      return new DistributionModel(query)
    default:
      return null
  }
}

export default buildModel
