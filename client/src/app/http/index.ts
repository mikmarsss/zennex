import axios from 'axios'
export const APi_URL = 'http://localhost:5000/api'
import { AuthResponse } from '../../entities/response/AuthResponse'

const $api = axios.create({
    withCredentials: true,
    baseURL: APi_URL
})



$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`http://localhost:5000/api/user/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error
})

export default $api;
