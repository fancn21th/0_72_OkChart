const updateSelectOptions = (select, options) => {
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

export { updateSelectOptions }
