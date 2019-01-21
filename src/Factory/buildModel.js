import PvModel from '../Model/m-pv-uv'

const buildModel = ({ type, query }) => {
  switch (type) {
    case 'pv-uv':
      return new PvModel(query)
    default:
      return null
  }
}

export default buildModel
