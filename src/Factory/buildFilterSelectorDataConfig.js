import defaultSelectorFilterConfig from '../Config/SelectorFilter/cfg-sf-default'

const buildSelectorFilter = ({ type }) => {
  switch (type) {
    case 'overview':
    case 'source-top-15':
      return defaultSelectorFilterConfig
    default:
      return null
  }
}

export default buildSelectorFilter
