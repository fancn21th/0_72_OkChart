const createSelect = ({ options }) => {
  const select = document.createElement('SELECT')
  options.forEach(option => {
    const z = document.createElement('option')
    z.setAttribute('value', option.value)
    var t = document.createTextNode(option.text)
    z.appendChild(t)
    select.appendChild(z)
  })
  return select
}

export { createSelect }
