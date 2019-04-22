import GoogleQuery from './GoogleQuery'
import OkQuery from './OkQuery'

const buildQuery = ({ gapi }) => {
  const googleQuery = new GoogleQuery(gapi)
  const okQuery = new OkQuery()
  return type => (type.startsWith('ok') ? okQuery : googleQuery)
}

export { buildQuery }
