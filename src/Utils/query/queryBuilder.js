import GoogleQuery from './GoogleQuery'
import OkQuery from './OkQuery'

const buildQuery = ({ gapi, okBaseUrl }) => {
  const googleQuery = new GoogleQuery(gapi)
  const okQuery = new OkQuery(okBaseUrl)
  return type => (type.startsWith('ok') ? okQuery : googleQuery)
}

export { buildQuery }
