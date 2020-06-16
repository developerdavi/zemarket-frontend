import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apize.devdavi.com.br'
})

export default api