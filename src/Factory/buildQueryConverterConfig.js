import overview from '../Config/QueryConverter/cfg-qc-overviews'
import sourceTop15 from '../Config/QueryConverter/cfg-qc-source-top-15'

const buildQueryConverterConfig = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    case 'source-top-15':
      return sourceTop15
    default:
      throw new Error('OKCHART::ERROR:: no query converter config is defined.')
  }
}

export default buildQueryConverterConfig
