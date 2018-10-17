import { NO_ALERTS } from './constants'

export const showLoading = state => ({ ...state, isLoading: true })
export const hideLoading = state => ({ ...state, isLoading: false })
export const registerSuccess = (state, { registration }) => ({ ...state, registration, isLoading: false })
export const registerFailed = (state, { message }) => ({ ...state, alert: { showAlert: true, message }, isLoading: false })
export const hideAlert = state => ({ ...state, alert: NO_ALERTS })
export const verifyEmployeePhotoFailed = (state, { message }) => ({ ...state, alert: { showAlert: true, message }, isLoading: false })
export const saveUser = (state, { user }) => ({ ...state, user })
