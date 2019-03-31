import defaultSelectorConfig from '../Config/DefaultSelector/cfg-s-default'
import sourceTop15SelectorConfig from '../Config/DefaultSelector/cfg-s-source-top-15'
import buyerRegistDistributionConfig from '../Config/DefaultSelector/cfg-s-buyers-regist-distribution'
import buyersRegistConfig from '../Config/DefaultSelector/cfg-s-buyers-regist'
import suppliersRegistConfig from '../Config/DefaultSelector/cfg-s-supplies-regist'
import pvUvConfig from '../Config/DefaultSelector/cfg-s-pv-uv'
import distributionConfig from '../Config/DefaultSelector/cfg-s-distribution'
import suppliersRegistDistributionConfig from '../Config/DefaultSelector/cfg-s-suppliers-regist-distribution'

const buildDefaultSelectorData = ({ ids, type }) => {
  const commonSelectorData = {
    ids,
    type,
    isQuerySelector: true,
    isFilterSelector: false,
  }
  switch (type) {
    case 'overview':
      return [
        {
          ...commonSelectorData,
          ...defaultSelectorConfig,
        },
      ]
    case 'pv-uv':
      return [
        {
          ...commonSelectorData,
          ...pvUvConfig,
        },
      ]
    case 'distribution':
      return [
        {
          ...commonSelectorData,
          ...distributionConfig,
        },
        {
          ...commonSelectorData,
          ...distributionConfig,
          isDoubleTimespan: true,
        },
      ]
    case 'source-top-15':
      return [
        {
          ...commonSelectorData,
          ...sourceTop15SelectorConfig,
        },
        {
          ...commonSelectorData,
          ...sourceTop15SelectorConfig,
          isDoubleTimespan: true,
        },
      ]
    case 'buyers-regist-distribution':
      return [
        {
          ...commonSelectorData,
          ...buyerRegistDistributionConfig,
        },
        {
          ...commonSelectorData,
          ...buyerRegistDistributionConfig,
          isDoubleTimespan: true,
        },
      ]
    case 'buyers-regist':
      return [
        {
          ...commonSelectorData,
          ...buyersRegistConfig,
        },
      ]
    case 'suppliers-regist':
      return [
        {
          ...commonSelectorData,
          ...suppliersRegistConfig,
        },
      ]
    case 'suppliers-regist-distribution':
      return [
        {
          ...commonSelectorData,
          ...suppliersRegistDistributionConfig,
        },
        {
          ...commonSelectorData,
          ...suppliersRegistDistributionConfig,
          isDoubleTimespan: true,
        },
      ]
    default:
      throw new Error('OKCHART::ERROR:: no default selector is defined.')
  }
}

const buildSelectorData = ({ type, ids, currentSelectorData }) => {
  const defaultSelectData = buildDefaultSelectorData({
    ids,
    type,
  })
  return defaultSelectData.map(item => ({
    ...item,
    ids,
    ...currentSelectorData,
  }))
}

export { buildDefaultSelectorData, buildSelectorData }
