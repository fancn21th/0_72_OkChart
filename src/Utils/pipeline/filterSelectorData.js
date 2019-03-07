const filter = ({
  context: { buildFilterSelectorDataConfig, viewType },
  selectorData,
}) => {
  const { filter } = buildFilterSelectorDataConfig({
    type: viewType,
  })
  return filter === null
    ? {
        filteredSelectorData: selectorData,
      }
    : {
        filteredSelectorData: Object.keys(selectorData).reduce((acc, key) => {
          if (!filter.includes(key)) {
            return {
              ...acc,
              [key]: selectorData[key],
            }
          }
          // exclude key/value pair given in filter
          return acc
        }, {}),
      }
}

export default filter
