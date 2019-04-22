import SuperSelector, { inheritPrototype } from './Base/SuperSelector'

const Selector = function({ chartContainerId }) {
  SuperSelector.call(this, { chartContainerId })
}

inheritPrototype(Selector, SuperSelector)

Selector.prototype.render = function() {}

export default Selector
