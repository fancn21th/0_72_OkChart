// 全部的总数
var totalCount = 0;
// 前十的总数
var totaltop10 = 0
const convert = collection => {
    collection.forEach(item => {
        totalCount += parseInt(item[1], 10)
    });
    // 取排名前十的国家
    if (collection.length > 10) {
        var top10 = collection.reverse().slice(0, 10).map(item => ({
            item: item[0],
            count: parseInt(item[1], 10),
            percent: (parseInt(item[1], 10) / totalCount)
        }))
        top10.forEach(item => {
            totaltop10 += parseInt(item.count, 10)
        });
        var obj = {
            item: 'others',
            count: parseInt(totalCount - totaltop10),
            percent: (parseInt(totalCount - totaltop10) / totalCount)
        }
        top10.push(obj);
    } else {

    }

    return top10;
}

export default convert