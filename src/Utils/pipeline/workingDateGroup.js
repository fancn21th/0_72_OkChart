const getKey = ({ item, indexes }) => {
  const key = indexes.map(idx => item[idx]).join(',')
  return key
}

const getValues = ({ item, indexes }) => {
  return indexes.reduce((acc, idx) => {
    if (item[idx]) {
      acc.push(parseInt(item[idx], 10))
    }
    return acc
  }, [])
}

const updateValues = ({ values, appendedValues }) =>
  values.map((val, idx) => val + appendedValues[idx])

const group = data => {
  const {
    responseData,
    context: { gaDateAppend, dateGroupFieldIndexes, dateSumFieldIndexes },
    selectorData: { workingDate },
  } = data

  if (workingDate && gaDateAppend) {
    const map = responseData.reduce((map, item) => {
        const key = getKey({
          item,
          indexes: dateGroupFieldIndexes,
        })
        const values = getValues({
          item,
          indexes: dateSumFieldIndexes,
        })
        if (map.has(key)) {
          const oldValues = map.get(key),
            sumValues = updateValues({
              values: oldValues,
              appendedValues: values,
            })
          map.set(key, sumValues)
        } else {
          map.set(key, values)
        }
        return map
      }, new Map()),
      arr = []

    map.forEach((values, key) => {
      arr.push([...key.split(','), ...values])
    })

    return {
      ...data,
      responseData: arr,
    }
  }
  return data
}

export default group
