const updateSelectOptions = (select, options) => {
  var length = select.options.length
  for (let i = 0; i < length; i++) {
    select.options[i] = null
  }
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

export { updateSelectOptions }
