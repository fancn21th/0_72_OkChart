const debuggger = function({ type, title, data }) {
  console.log(`data flow::[view type:${type}]::[data type:${title}]::`, data)
}

export { debuggger }
