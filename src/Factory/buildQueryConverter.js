import convertPvUvQuery from '../Converter/Query/c-q-pv-uv'

const buildQueryConverter = ({ type }) => {
  switch (type) {
    case 'pv-uv':
      return convertPvUvQuery
    default:
      return null
  }
}

export default buildQueryConverter
