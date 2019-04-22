import SuperModel, { inheritPrototype } from './Base/SuperModel'

const Model = function(query) {
  SuperModel.call(this, {
    query,
    modelType: 'modelTypeNameToChange', // change this before use
  })
}

inheritPrototype(Model, SuperModel)

export default Model
