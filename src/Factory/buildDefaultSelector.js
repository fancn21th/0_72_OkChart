import defaultSelectorConfig from '../Config/DefaultSelector/cfg-s-default'
import sourceTop15SelectorConfig from '../Config/DefaultSelector/cfg-s-source-top-15'

const buildDefaultSelector = ({ type }) => {
  switch (type) {
    case 'overview':
      return defaultSelectorConfig
    case 'source-top-15':
      return sourceTop15SelectorConfig
    default:
      return null
  }
}

export default buildDefaultSelector
