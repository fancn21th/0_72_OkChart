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

const createText = ({ text }) => {
  const txt = document.createTextNode(text)
  return txt
}

const createUnorderedList = ({ child, children }) => {
  const ul = document.createElement('UL')
  if (child) {
    ul.appendChild(child)
  }
  if (children) {
    children.forEach(item => {
      ul.appendChild(item)
    })
  }
  return ul
}

const createUnorderedListItem = ({ child, children }) => {
  const li = document.createElement('LI')
  if (child) {
    li.appendChild(child)
  }
  if (children) {
    children.forEach(item => {
      li.appendChild(item)
    })
  }
  return li
}

const createSpan = ({ text }) => {
  const span = document.createElement('SPAN')
  const txt = createText({ text })
  span.appendChild(txt)
  return span
}

export {
  createSelect,
  createDate,
  createDiv,
  createDiv2,
  createText,
  createUnorderedList,
  createUnorderedListItem,
  createSpan,
}
