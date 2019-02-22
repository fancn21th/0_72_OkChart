import overview from '../Config/QueryConverter/c-qc-overviews'

const buildQueryConverterConfig = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    default:
      return null
  }
}

export default buildQueryConverterConfig
