
import axios from 'axios'
import { getCookie } from './authApi'

const axiosInstance = axios.create({
    baseURL:'https://vue-course-api.hexschool.io',
})
//請求攔截器
axiosInstance.interceptors.request.use(
    config => {
        const token = getCookie();
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },error => Promise.reject(error)
)
//回應攔截器
axiosInstance.interceptors.response.use(
    response => response,
    error =>{
        return Promise.reject(error)
    }
)
export default axiosInstance