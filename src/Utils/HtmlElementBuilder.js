const createSelect = ({ options, id, multiple, className }) => {
  const select = document.createElement('SELECT')
  // TODO: css class
  select.setAttribute('class', 'rangeSelect')
  if (id) {
    select.setAttribute('id', id)
  }
  if (multiple) {
    select.setAttribute('multiple', 'multiple')
  }
  if (className) {
    select.setAttribute('class', className)
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
  }
  return select
}

const createDate = () => {
  const date = document.createElement('INPUT')
  date.setAttribute('type', 'date')
  date.setAttribute('class', 'dateInput')
  return date
}

// TODO: remove this method
const createDiv = id => {
  const divEl = document.createElement('DIV')
  // TODO: css class
  divEl.setAttribute('class', 'chart-container__diagram')
  divEl.setAttribute('id', id)
  return divEl
}

const createDiv2 = ({ id, className }) => {
  const div = document.createElement('DIV')
  div.setAttribute('id', id)
  if (className) {
    div.setAttribute('class', className)
  }
  return div
}

const createText = ({ text }) => {
  const txt = document.createTextNode(text)
  return txt
}

const createUnorderedList = ({ child, children, className }) => {
  const ul = document.createElement('UL')
  if (child) {
    ul.appendChild(child)
  }
  if (children) {
    children.forEach(item => {
      ul.appendChild(item)
    })
  }
  if (className) {
    ul.setAttribute('class', className)
  }
  return ul
}

const createUnorderedListItem = ({ child, children, className }) => {
  const li = document.createElement('LI')
  if (child) {
    li.appendChild(child)
  }
  if (children) {
    children.forEach(item => {
      li.appendChild(item)
    })
  }
  if (className) {
    li.setAttribute('class', className)
  }
  return li
}

const createSpan = ({ text, className }) => {
  const span = document.createElement('SPAN')
  const txt = createText({ text })
  span.appendChild(txt)
  if (className) {
    span.setAttribute('class', className)
  }
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
