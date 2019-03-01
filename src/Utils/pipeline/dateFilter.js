import { isWorkingDate } from '../TimeHelper'

const dateFilter = ({ responseData, selectorData: { workingDate } }) => {
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

export default dateFilter
