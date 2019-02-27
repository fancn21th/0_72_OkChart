import overview from '../Config/DefaultSelector/cfg-s-overview'

const buildDefaultSelector = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    default:
      return null
  }
}

export default buildDefaultSelector
