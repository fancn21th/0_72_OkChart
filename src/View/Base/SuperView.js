import { createDiv2, createText } from '../../Utils/HtmlElementBuilder'
import inheritPrototype from '../../Utils/inheritPrototype'

function SuperView({ chartContainerId, title }) {
  this.chartWrapperId = `${chartContainerId}-chart-wrapper`
  this.selectorWrapperId = `${chartContainerId}-selector-wrapper`
  this.titleWrapperId = `${chartContainerId}-title-wrapper`
  this.chartWrapper = createDiv2({
    id: this.chartWrapperId,
  })
  this.selectorWrapper = createDiv2({
    id: this.selectorWrapperId,
  })
  this.titleWrapper = createDiv2({
    id: this.titleWrapperId,
  })
  this.titleWrapper.appendChild(
    createText({
      text: title,
    })
  )
  const container = document.getElementById(chartContainerId)
  container.appendChild(this.titleWrapper)
  container.appendChild(this.selectorWrapper)
  container.appendChild(this.chartWrapper)
}

export default SuperView
export { inheritPrototype }
