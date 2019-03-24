import { isWorkingDate } from '../TimeHelper'

const filterDateByWorkingDate = ({
  responseData,
  selectorData: { workingDate },
}) => {
  const dateFieldIndex = 0
  if (workingDate === true) {
    const filterObj = {}, // cache date string already checked
      filteredCollection = responseData.filter(item => {
        const dateStr = item[dateFieldIndex]
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

export default filterDateByWorkingDate
