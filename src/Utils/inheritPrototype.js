function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype) //创建对象
  prototype.constructor = subType //增强对象
  subType.prototype = prototype //指定对象
}

export default inheritPrototype
