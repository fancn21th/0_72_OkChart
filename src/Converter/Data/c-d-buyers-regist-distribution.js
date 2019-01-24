// 全部的总数
var totalCount = 0;
// 前十的总数
var totaltop10 = 0
const convert = collection => {
    collection.forEach(item => {
        totalCount += parseInt(item[1], 10)
    });
    // console.log("totalCount=" + totalCount);
    // 取排名前十的国家
    var top10 = collection.reverse().slice(0, 10).map(item => ({
        item: item[0],
        count: parseInt(item[1], 10),
        percent: (parseInt(item[1], 10) / totalCount)
    }))

    top10.forEach(item => {
        totaltop10 += parseInt(item.count, 10)
    });
    // console.log("totaltop10=" + totaltop10);

    var obj = {
        item: 'others',
        count: parseInt(totalCount - totaltop10),
        percent: (parseInt(totalCount - totaltop10) / totalCount)
    }
    top10.push(obj);
    return top10;
}

// console.log("买家分布map出来的结果" + convert)
export default convert