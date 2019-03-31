import { isWorkingDate } from '../TimeHelper'

const filterWorkingDate = data => {
  const {
    selectorData: { workingDate },
    responseData,
    context,
  } = data
  if (workingDate === true) {
    const dateFieldIndex = 0,
      filterObj = {}, // cache date string already checked
      filteredResponseData = responseData.filter(item => {
        const dateStr = item[dateFieldIndex]
        if (dateStr in filterObj) {
          return filterObj[dateStr]
        }
        const filterState = isWorkingDate(dateStr)
        filterObj[dateStr] = filterState
        return filterState
      })
    return {
      ...data,
      responseData: filteredResponseData,
      context: {
        ...context,
        nonWorkingDateCount: Object.keys(filterObj).filter(
          key => filterObj[key] === false
        ).length,
      },
    }
  }
  return {
    ...data,
    context: {
      ...context,
      nonWorkingDateCount: 0,
    },
  }
}

export default filterWorkingDate
