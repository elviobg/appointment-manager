import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    const headers = {
      'Access-Control-Allow-Origin': true,
      'x-access-token': token
    }
    config.headers = headers
  }
  return config
})

export default api
