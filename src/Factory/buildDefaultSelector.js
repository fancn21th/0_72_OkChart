import overview from '../Config/Selector/cfg-s-overview'

const buildDefaultSelector = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    default:
      return null
  }
}

export default buildDefaultSelector
