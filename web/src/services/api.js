import axios from 'axios'
import { getToken, logout } from './auth'

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

api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    logout()
  }
  return Promise.reject(error)
})

export default api
