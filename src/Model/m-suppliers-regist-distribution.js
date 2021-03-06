import SuperModel, { inheritPrototype } from './Base/SuperModel'

const Model = function(query) {
  SuperModel.call(this, {
    query,
    modelType: 'suppliers-regist-distribution',
  })
}

inheritPrototype(Model, SuperModel)

export default Model
