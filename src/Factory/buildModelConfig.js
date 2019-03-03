import overview from '../Config/Model/cfg-m-overview'
import sourceTop15 from '../Config/Model/cfg-m-source-top-15'

const buildModelConfig = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    case 'source-top-15':
      return sourceTop15
    default:
      throw new Error('OKCHART::ERROR:: no model config is defined.')
  }
}

export default buildModelConfig
