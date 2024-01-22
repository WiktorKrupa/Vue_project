import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state ={
    isSubmitting: false,
    isLoggedIn: null,
    currentUser: null,
    validationErrors: null
}
const mutations = {
    registerStart(state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    registerFaliure(state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    }
}
const actions = {
    register(context, credentials) {
        return new Promise(resolve => {
            context.commit('registerStart')
            authApi
            .register(credentials)
            .then(response => {
                context.commit('registerSuccess', response.data.user)
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            }).catch(result => {
                context.commit('registerFaliure', result.response.data.errors)
            })
        })
    }
}
export default {
    state, 
    actions,
    mutations
    //getters
}