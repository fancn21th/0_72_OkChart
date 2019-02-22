import overview from '../Config/QueryConverter/cfg-qc-overviews'

const buildQueryConverterConfig = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    default:
      return null
  }
}

export default buildQueryConverterConfig
