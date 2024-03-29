import axios from 'axios'

// 允许跨域携带cookie信息
axios.defaults.withCredentials = true
axios.default.timeout = 50000

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000'
  })
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  return instance(config)
}
