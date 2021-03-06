const debuggger = function({ type, title, data }) {
  const filter = {
    type: '*',
    title: '*',
  }
  if (filter.type === '*' || filter.type.includes(type))
    if (filter.title === '*' || filter.title.includes(title)) {
      console.log(
        `data flow::[view type:${type}]::[data type:${title}]::`,
        data
      )
    }
}

export { debuggger }
