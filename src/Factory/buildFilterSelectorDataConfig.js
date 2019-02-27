import overview from '../Config/SelectorFilter/cfg-sf-overviews'

const buildSelectorFilter = ({ type }) => {
  switch (type) {
    case 'overview':
      return overview
    default:
      return null
  }
}

export default buildSelectorFilter
