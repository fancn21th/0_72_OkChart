import buildWidgets from '../Factory/buildWidgets'
import PvUvModel from '../Model/m-pv-uv'
import PvUvPresenter from '../Presenter/p-pv-uv'
import PvUvView from '../View/v-pv-uv'

const Page = function({ viewElements, query }) {
  const { charts, authenticator, viewSelector } = viewElements
  this.widgets = buildWidgets(charts)
  this.authenticator = authenticator
  this.viewSelector = viewSelector
  this.query = query
}

Page.prototype = {
  init: function() {
    /*
      pv-uv
    */
    // model
    const pvUvModel = new PvUvModel(this.query)

    // view
    const pvUvView = new PvUvView({
      widgets: this.widgets,
    })

    // presenter
    const pvUvPresenter = new PvUvPresenter(pvUvModel, pvUvView)
    pvUvPresenter.init()
  },
  render: function(data) {
    this.widgets.forEach(widget => {
      widget.render(data)
    })
  },
}

export default Page
