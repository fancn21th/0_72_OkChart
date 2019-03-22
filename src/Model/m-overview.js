import SuperModel, { inheritPrototype } from './Base/SuperModel'

const Model = function(query) {
  SuperModel.call(this, {
    query,
    modelType: 'overview',
  })
}

inheritPrototype(Model, SuperModel)

export default Model
