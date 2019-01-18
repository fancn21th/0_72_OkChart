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

const createDate = () => {
  const date = document.createElement('INPUT')
  date.setAttribute('type', 'date')
  return date
}

export { createSelect, createDate }
