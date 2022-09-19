import axios from 'axios'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return await Promise.reject(error)
  }
)

export default api
