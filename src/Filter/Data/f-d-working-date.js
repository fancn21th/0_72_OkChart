import { getDay } from '../../Utils/TimeHelper'

const filter = ({ collection, workingDate }) => {
  if (workingDate === false) {
    // filter working date
    const firstData = collection[0][0]
    const firstDay = getDay(firstData)
    return collection.filter((item, idx) => {
      const day = (idx + firstDay) % 7
      return day !== 0 && day !== 6
    })
  }
  return collection
}

export default filter
