import axios from "axios";
import store from "./store"

// Own back-end address default
const laravelClient = axios.create({
    baseURL: 'http://localhost:8000/api'
})
// Pass the authorization token along with every request
laravelClient.interceptors.request.use(config => {
    // Inject authorization header
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config;
})

// Alphavantage API
const stockClient = axios.create({
    baseURL: 'https://www.finnhub.io/api/v1'
})

export {laravelClient, stockClient}
