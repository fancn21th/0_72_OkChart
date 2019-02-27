import { isWorkingDate } from '../../Utils/TimeHelper'

const workingDate = ({ responseData, selectorData: { workingDate } }) => {
  if (workingDate === true) {
    const filterObj = {} // cache date string already checked
    const filteredCollection = responseData.filter(item => {
      const dateStr = item[0]
      if (dateStr in filterObj) {
        return filterObj[dateStr]
      }
      const filterState = isWorkingDate(dateStr)
      filterObj[dateStr] = filterState
      return filterState
    })
    return {
      responseData: filteredCollection,
      nonWorkingDateCount: Object.keys(filterObj).filter(
        key => filterObj[key] === false
      ).length,
    }
  }
  return { responseData, nonWorkingDateCount: 0 }
}

// default pipeline
const pipeline = [workingDate]

const converter = ({
  selectorData,
  // queryParams,
  responseData,
  totals,
  config: { convert },
}) => {
  const pip = [...pipeline, convert]
  return pip.reduce(
    (acc, fn) => {
      return {
        ...acc,
        ...fn({
          ...acc,
        }),
      }
    },
    {
      responseData,
      selectorData,
      totals,
    }
  )
}

export default converter
