const convert = collection => collection.map(item => ({
    day: item[0],
    buyers: parseInt(item[1], 10),
}))
console.log("注册买家数map出来的结果" + convert)
export default convert