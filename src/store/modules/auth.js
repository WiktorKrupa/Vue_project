import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state ={
    isSubmitting: false,
    isLoggedIn: null,
    isLoading: false,
    currentUser: null,
    validationErrors: null
}

export const mutationTypes = {
    registerStart: '[auth] Register start',
    registerSuccess: '[auth] Register success',
    registerFaliure: '[auth] Register faliure',

    loginStart: '[auth] Login start',
    loginSuccess: '[auth] Login success',
    loginFaliure: '[auth] Login faliure',

    getCurrentUserStart: '[auth] GetCurrentUser start',
    getCurrentUserSuccess: '[auth] GetCurrentUser success',
    getCurrentUserFaliure: '[auth] GetCurrentUser faliure'
}

export const actionTypes = {
    register: '[auth] Register',
    login: '[auth] Login',
    getCurrentUser: '[auth] Get Current User'
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}

const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser
    },
    [getterTypes.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false
    }
}

const mutations = {
    [mutationTypes.registerStart](state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.registerFaliure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },

    [mutationTypes.loginStart](state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.loginFaliure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false,
        state.isLoggedIn = true,
        state.currentUser = payload
    },
    [mutationTypes.getCurrentUserFalure](state) {
        state.isLoading = false,
        state.isLoggedIn = false,
        state.currentUser = null
    }
}
const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi
            .register(credentials)
            .then(response => {
                context.commit(mutationTypes.registerSuccess, response.data.user)
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            }).catch(result => {
                context.commit(mutationTypes.registerFaliure, result.response.data.errors)
            })
        })
    },

    [actionTypes.login](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart)
            authApi
            .login(credentials)
            .then(response => {
                context.commit(mutationTypes.loginSuccess, response.data.user)
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            }).catch(result => {
                context.commit(mutationTypes.loginFaliure, result.response.data.errors)
            })
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi
            .getCurrentUser()
            .then(response => {
                context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
                resolve(response.data.user)
            }).catch(() => {
                context.commit(mutationTypes.getCurrentUserFaliure)
            })
        })
    }
}
export default {
    state, 
    actions,
    mutations,
    getters
}