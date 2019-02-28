import SuperModel, { inheritPrototype } from './Base/SuperModel'
import config from '../Config/Model/cfg-m-overview'

const Model = function(query) {
  SuperModel.call(this, {
    query,
    config,
  })
}

inheritPrototype(Model, SuperModel)

export default Model
