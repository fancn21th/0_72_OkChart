const convert = (collection, currentData) => {
    currentData.pop()
    const growthArr = currentData.map(e => {
        let changeData = { item: e.item, value: e.count };
        collection.forEach(element => {
            if (element[0] === e.item) {
                const addData = e.count - parseInt(element[1]);
                changeData = { item: e.item, value: addData }
            }
        })
        return changeData
    })
    return growthArr
}
export default convert