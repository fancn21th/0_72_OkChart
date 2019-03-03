import defaultSelectorConfig from '../Config/DefaultSelector/cfg-s-default'
import sourceTop15SelectorConfig from '../Config/DefaultSelector/cfg-s-source-top-15'

const buildDefaultSelector = ({ ids, type }) => {
  switch (type) {
    case 'overview':
      return defaultSelectorConfig
    case 'source-top-15':
      return [
        sourceTop15SelectorConfig,
        {
          ...sourceTop15SelectorConfig,
          isDoubleTimespan: true,
        },
      ]
    default:
      return null
  }
}

export default buildDefaultSelector
