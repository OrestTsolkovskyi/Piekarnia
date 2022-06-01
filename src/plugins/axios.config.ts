import axios from 'axios'

const token = localStorage.getItem('user-token')
// const adminToken = localStorage.getItem('admin-token')

const _instance = axios.create({
  baseURL: 'http://Localhost:8080/',
  headers: {
    ...token && { Authorization: token },
    'Content-Language': localStorage.getItem('lang') || 'en-US'
  }
})

export default _instance
