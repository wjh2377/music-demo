// 网络请求 - 二次封装	 	
import axios from 'axios'
// axios.defaults.baseURL = "http://localhost:3000"

// 创建axios实例
const service = axios.create({
    baseURL: "http://localhost:3000", // api的base_url
    timeout: 5000 // 请求超时时间
})

// 请求拦截器

// 响应拦截器
axios.interceptors.response.use((response) => {
    if (response && response.status === 200) {
        return response.data
    }
}, (error) => {
    return Promise.reject(error)
})

export default axios