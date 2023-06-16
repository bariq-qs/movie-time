import axios from 'axios'
import environment from '@/configs/environtment'

const { API_URL } = environment

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: '*/*',
  },
})

api.interceptors.request.use((config: any) => config, (error: any) => Promise.reject(error))

api.interceptors.response.use((response: any) => response, (error: any) => Promise.reject(error))

export default api
