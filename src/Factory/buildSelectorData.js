import { isArray } from '../Utils/typeHelper'
import defaultSelectorConfig from '../Config/DefaultSelector/cfg-s-default'
import sourceTop15SelectorConfig from '../Config/DefaultSelector/cfg-s-source-top-15'
import buyerRegistDistributionConfig from '../Config/DefaultSelector/cfg-s-buyers-regist-distribution'
import buyersRegistConfig from '../Config/DefaultSelector/cfg-s-buyers-regist'
import suppliersRegistConfig from '../Config/DefaultSelector/cfg-s-supplies-regist'
import pvUvConfig from '../Config/DefaultSelector/cfg-s-pv-uv'
import distributionConfig from '../Config/DefaultSelector/cfg-s-distribution'
import suppliersRegistDistributionConfig from '../Config/DefaultSelector/cfg-s-suppliers-regist-distribution'

const buildDefaultSelectorData = ({ ids, type }) => {
  const selectorData = {
    ids,
    type,
  }
  switch (type) {
    case 'overview':
      return {
        ...selectorData,
        ...defaultSelectorConfig,
      }
    case 'pv-uv':
      return {
        ...selectorData,
        ...pvUvConfig,
      }
    case 'distribution':
      return [
        {
          ...selectorData,
          ...distributionConfig,
        },
        {
          ...selectorData,
          ...distributionConfig,
          isDoubleTimespan: true,
        },
      ]
    case 'source-top-15':
      return [
        {
          ...selectorData,
          ...sourceTop15SelectorConfig,
        },
        {
          ...sourceTop15SelectorConfig,
          isDoubleTimespan: true,
          ids,
        },
      ]
    case 'buyers-regist-distribution':
      return [
        {
          ...selectorData,
          ...buyerRegistDistributionConfig,
        },
        {
          ...selectorData,
          ...buyerRegistDistributionConfig,
          isDoubleTimespan: true,
        },
      ]
    case 'buyers-regist':
      return {
        ...selectorData,
        ...buyersRegistConfig,
      }
    case 'suppliers-regist':
      return {
        ...selectorData,
        ...suppliersRegistConfig,
      }
    case 'suppliers-regist-distribution':
      return [
        {
          ...selectorData,
          ...suppliersRegistDistributionConfig,
        },
        {
          ...selectorData,
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
  return isArray(defaultSelectData)
    ? defaultSelectData.map(item => ({
        ...item,
        ids,
        ...currentSelectorData,
      }))
    : {
        ...defaultSelectData,
        ids,
        ...currentSelectorData,
      }
}

export { buildDefaultSelectorData, buildSelectorData }
