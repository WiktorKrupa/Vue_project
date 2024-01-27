import axios from 'axios'
import { getItem } from '@/helpers/persistanceStorage'
axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use((config) => {
    const token = getItem('accesToken')
    const authorisationToken = token ? 'Token ${token}' : ''
    config.headers.Authorization = authorisationToken
    return config
})

export default axios