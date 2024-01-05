import Axios from 'axios'
import { API_BASE_URL } from '../config'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory({ forceRefresh: true })
export const axios = Axios.create({})
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = token
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const statusCode =
      error?.response?.data?.statusCode || error?.response?.status

    if (statusCode === 401 || statusCode === 403) {
      history.replace('/login')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)
