const createSelect = ({ options, id, multiple, className }) => {
  const select = document.createElement('SELECT')
  if (id) {
    select.setAttribute('id', id)
  }
  if (multiple) {
    select.setAttribute('multiple', 'multiple')
  }
  if (className) {
    select.setAttribute('class', className)
  } else {
    // TODO: css class
    select.setAttribute('class', 'rangeSelect')
  }
  if (options) {
    options.forEach(item => {
      const option = document.createElement('option')
      option.setAttribute('value', item.value)
      if (item.selected) {
        option.setAttribute('selected', 'selected')
      }
      var t = document.createTextNode(item.text)
      option.appendChild(t)
      select.appendChild(option)
    })
  }
  return select
}

const createCheckbox = ({ checked }) => {
  const checkbox = document.createElement('INPUT')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('checked', checked)
  return checkbox
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

const createTable = ({ titles, data, className }) => {
  const table = document.createElement('TABLE')
  const trTitle = document.createElement('TR')
  titles.forEach(title => {
    const thTitle = document.createElement('TH'),
      txt = createText({ text: title })
    thTitle.appendChild(txt)
    trTitle.appendChild(thTitle)
  })
  table.appendChild(trTitle)
  data.reduce((tb, item) => {
    const tr = document.createElement('TR')
    item.reduce((tr, val) => {
      const td = document.createElement('TD'),
        txt = createText({ text: val })
      td.appendChild(txt)
      tr.appendChild(td)
      return tr
    }, tr)
    tb.appendChild(tr)
    return tb
  }, table)
  table.setAttribute('class', className)
  return table
}

export {
  createSelect,
  createCheckbox,
  createDate,
  createDiv,
  createDiv2,
  createText,
  createUnorderedList,
  createUnorderedListItem,
  createSpan,
  createTable,
}
