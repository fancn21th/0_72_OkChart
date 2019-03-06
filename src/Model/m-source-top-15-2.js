import SuperModel, { inheritPrototype } from './Base/SuperModel'

const Model = function(query) {
  SuperModel.call(this, {
    query,
    modelType: 'source-top-15',
  })
}

inheritPrototype(Model, SuperModel)

export default Model
