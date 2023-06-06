import axios from "axios";
import store from "./store"

// Own back-end address default
const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})

// Pass the authorization token along with every request
axiosClient.interceptors.request.use(config => {
    // Inject authorization header
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config;
})

export default axiosClient;