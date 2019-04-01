const debuggger = function({ type, title, data }) {
  const filter = ['overview']
  if (filter === '*' || filter.includes(type))
    console.log(`data flow::[view type:${type}]::[data type:${title}]::`, data)
}

export { debuggger }
