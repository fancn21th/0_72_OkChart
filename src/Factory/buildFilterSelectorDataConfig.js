import defaultSelectorFilterConfig from '../Config/SelectorFilter/cfg-sf-default'

const buildSelectorFilter = ({ type }) => {
  switch (type) {
    case 'overview':
    case 'source-top-15':
      return defaultSelectorFilterConfig
    default:
      throw new Error('OKCHART::ERROR:: no selector filter config is defined.')
  }
}

export default buildSelectorFilter
