const PvUv = function({ widgets, selector }) {
  this.widgets = widgets
  this.selector = selector
}

PvUv.prototype = {
  render: function(data) {
    this.widgets.forEach(widget => {
      widget.render(data)
    })
  },
}

export default PvUv
