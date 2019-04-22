import SuperModel, { inheritPrototype } from './Base/SuperModel'

const Model = function(query) {
  SuperModel.call(this, {
    query,
    modelType: 'modelTypeNameToChange', // TODO: change modelType
  })
}

inheritPrototype(Model, SuperModel)

export default Model
