import overview from '../Config/Model/cfg-m-overview'
import sourceTop15 from '../Config/Model/cfg-m-source-top-15'
import buyerRegistDistribution from '../Config/Model/cfg-m-buyer-regist-distribution'
import pvUv from '../Config/Model/cfg-m-pv-uv'

const buildModelConfig = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    case 'pv-uv':
      return pvUv
    case 'source-top-15':
      return sourceTop15
    case 'buyers-regist-distribution':
      return buyerRegistDistribution
    default:
      throw new Error('OKCHART::ERROR:: no model config is defined.')
  }
}

export default buildModelConfig
