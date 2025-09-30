import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const api = axios.create({ baseURL: BASE_URL + '/api' })

export function setToken(token) {
  if (token) api.defaults.headers.common['Authorization'] = 'Bearer ' + token
  else delete api.defaults.headers.common['Authorization']
}

export default api
