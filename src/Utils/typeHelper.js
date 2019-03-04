const isFunction = function(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

const isArray = function(arrayToCheck) {
  return Array.isArray(arrayToCheck)
}

const isInteger = function(integerToCheck) {
  return Number.isInteger(integerToCheck)
}

export { isFunction, isArray, isInteger }
