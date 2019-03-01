import overview from '../Config/Model/cfg-m-overview'

const buildModelConfig = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    default:
      return null
  }
}

export default buildModelConfig
