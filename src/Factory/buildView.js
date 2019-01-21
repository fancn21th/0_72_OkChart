import PvUvView from '../View/v-pv-uv'

const buildView = ({ type, containerId }) => {
  switch (type) {
    case 'pv-uv':
      return new PvUvView(containerId)
    default:
      return null
  }
}

export default buildView