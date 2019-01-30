const convert = collection => collection.map(item => ({
    day: item[0],
    suppliers: parseInt(item[1], 10),
}))

export default convert