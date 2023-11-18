import http from './httpService'
const register = (data) => http.post(`/auth/register`, data)
const login = (data) => http.post(`/auth/login`, data)
const getUser = () => http.get('/auth/user')
export { register, login, getUser }
