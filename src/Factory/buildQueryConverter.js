import convertPvUvQuery from '../Converter/Query/c-q-pv-uv'
import convertDistributionQuery from '../Converter/Query/c-q-distribution'

const buildQueryConverter = ({ type }) => {
  switch (type) {
    case 'pv-uv':
      return convertPvUvQuery
    case 'distribution':
      return convertDistributionQuery
    default:
      return null
  }
}

export default buildQueryConverter
