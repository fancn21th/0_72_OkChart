const createSelect = ({ options }) => {
  const select = document.createElement('SELECT')
  select.setAttribute('class', 'rangeSelect')
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

const createDate = () => {
  const date = document.createElement('INPUT')
  date.setAttribute('type', 'date')
  date.setAttribute('class', 'dateInput')
  return date
}

const createDiv = id => {
  const divEl = document.createElement('DIV')
  divEl.setAttribute('class', 'chart-part')
  divEl.setAttribute('id', id)
  return divEl
}

const createDiv2 = ({ id }) => {
  const div = document.createElement('DIV')
  div.setAttribute('id', id)
  return div
}

const creatText = ({ text }) => {
  const txt = document.createTextNode(text)
  return txt
}

export { createSelect, createDate, createDiv, createDiv2, creatText }
