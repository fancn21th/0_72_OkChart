const createSelect = ({ options }) => {
  const select = document.createElement('SELECT')
  select.setAttribute('class', 'rangeSelect')
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
  date.setAttribute('class', 'dateInput')
  return date
}

export { createSelect, createDate }
