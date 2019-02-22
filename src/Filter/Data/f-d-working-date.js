import { isWorkingDate } from '../../Utils/TimeHelper'

// filter working date
const filter = ({ collection, workingDate }) => {
  if (workingDate === true) {
    const filterObj = {} // cache date string already checked
    const filteredCollection = collection.filter(item => {
      const dateStr = item[0]
      if (filterObj[dateStr] !== undefined) {
        return filterObj[dateStr]
      }
      const filterState = isWorkingDate(dateStr)
      filterObj[dateStr] = filterState
      return filterState
    })
    return {
      collection: filteredCollection,
      nonWorkingDateCount: Object.keys(filterObj).filter(
        key => filterObj[key] === false
      ).length,
    }
  }
  return { collection, nonWorkingDateCount: 0 }
}

export default filter
