import axios from 'axios'

const token = localStorage.getItem('user-token')
// const adminToken = localStorage.getItem('admin-token')

const _instance = axios.create({
  baseURL: 'http://Localhost:8080/',
  // timeout: 1000,
  headers: {
    ...token && { Authorization: token }
    // ...adminToken && { Authorization: adminToken }
  }
})

export default _instance
