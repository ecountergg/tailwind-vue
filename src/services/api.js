import axios from 'axios'
import store from '@/store';
import { getToken } from '@/utils/auth.js'

const defaultOptions = {
    baseURL: process.env.VUE_APP_BASE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
    const token = store.state.auth.token ? store.state.auth.token : getToken();
    config.headers.common['Authorization'] =  token ? `Bearer ${token}` : '';

    return config;
});

export default instance
