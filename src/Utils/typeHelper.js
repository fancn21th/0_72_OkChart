const isFunction = function(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

const isArray = function(arrayToCheck) {
  return Array.isArray(arrayToCheck)
}

export { isFunction, isArray }
