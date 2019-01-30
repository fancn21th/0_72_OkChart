const convert = (collection, currentData) => {
    // 去掉当前数据中的others
    currentData.pop();

    const growthArr = currentData.map(e => {
        // 取排名前十的国家
        var top10 = collection.reverse().slice(0, 10).map(item => ({
            item: item[0],
            value: parseInt(item[1], 10)
        }))

        let changeData = null;
        collection.forEach(item => {
            if (item[0] === e.item) {
                const addData = e.count - parseInt(item[1]);
                changeData = { item: e.item, value: addData }
            }
        })
        return changeData
    })
    return growthArr
}
export default convert