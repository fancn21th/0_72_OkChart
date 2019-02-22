const updateSelectOptions = (select, options) => {
  select.options.length = 0 // remove all old options
  if (options) {
    options.forEach(option => {
      const z = document.createElement('option')
      z.setAttribute('value', option.value)
      if (option.selected) {
        z.setAttribute('selected', 'selected')
      }
      var t = document.createTextNode(option.text)
      z.appendChild(t)
      select.appendChild(z)
    })
    return select
  }
}

const getSelectedOptions = select => {
  const length = select.options.length
  const selected = []
  for (let i = 0; i < length; i++) {
    const item = select.options[i]
    if (item.selected) {
      selected.push(item.value)
    }
  }
  return selected
}

export { updateSelectOptions, getSelectedOptions }
