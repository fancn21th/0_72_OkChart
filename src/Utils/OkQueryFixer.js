import {
  getStartEndDateStrByTimespan,
  getDateBySelectorFormat,
} from './TimeHelper'

const fixQuery = (queryParams, selectData) => {
  const { timespan, startDate, endDate } = selectData
  // fix date
  const {
    startDate: startDateTime,
    endDate: endDateTime,
  } = getStartEndDateStrByTimespan(timespan)
  const fixDateObj = {}
  if (!startDate) {
    fixDateObj['start-date'] = getDateBySelectorFormat(startDateTime)
  }
  if (!endDate) {
    fixDateObj['end-date'] = getDateBySelectorFormat(endDateTime)
  }
  // delete ids
  delete queryParams.ids
  // delete sort
  delete queryParams.sort
  return {
    ...queryParams,
    ...fixDateObj,
  }
}

export default fixQuery
