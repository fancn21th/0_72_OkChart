import { isArray } from '../Utils/typeHelper'
import defaultSelectorConfig from '../Config/DefaultSelector/cfg-s-default'
import sourceTop15SelectorConfig from '../Config/DefaultSelector/cfg-s-source-top-15'
import buyerRegistDistributionConfig from '../Config/DefaultSelector/cfg-s-buyers-regist-distribution'
import pvUvConfig from '../Config/DefaultSelector/cfg-s-pv-uv'

const buildDefaultSelectorData = ({ ids, type }) => {
  switch (type) {
    case 'overview':
      return { ...defaultSelectorConfig, ids }
    case 'pv-uv':
      return { ...pvUvConfig, ids }
    case 'source-top-15':
      return [
        { ...sourceTop15SelectorConfig, ids },
        {
          ...sourceTop15SelectorConfig,
          isDoubleTimespan: true,
          ids,
        },
      ]
    case 'buyers-regist-distribution':
      return [
        { ...buyerRegistDistributionConfig, ids },
        { ...buyerRegistDistributionConfig, isDoubleTimespan: true, ids },
      ]
    default:
      throw new Error('OKCHART::ERROR:: no default selector is defined.')
  }
}

const buildSelectorData = ({ basedSelectorData, ids, currentSelectorData }) => {
  return isArray(basedSelectorData)
    ? basedSelectorData.map(item => ({
        ...item,
        ids,
        ...currentSelectorData,
      }))
    : {
        ...basedSelectorData,
        ids,
        ...currentSelectorData,
      }
}

export { buildDefaultSelectorData, buildSelectorData }