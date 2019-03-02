const convert = ({ distribution, distributionDoubleTimespan }) => {
    const { collection: top10collection } = distribution
    const {
        collection: top10DoubleTimespanCollection,
    } = distributionDoubleTimespan

    const top10DoubleTimespanObj = top10DoubleTimespanCollection.reduce(
        (acc, val) => {
            acc[val[0]] = parseInt(val[1] || 0, 10)
            return acc
        }, {}
    )

    return top10collection.slice(0, 15).map(item => {
        const currentCount = parseInt(item[1] || 0, 10)
        const currentPlusLastCount = top10DoubleTimespanObj[item[0]]
        const value = currentCount * 2 - currentPlusLastCount
        return {
            item: item[0],
            value,
        }
    })
}

export default convert