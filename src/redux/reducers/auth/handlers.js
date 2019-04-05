import { NO_ALERTS, NOT_LOGGED_IN } from './constants'

export const showLoading = state => ({ ...state, isLoading: true })
export const hideLoading = state => ({ ...state, isLoading: false })
export const registerSuccess = (state, { registration }) => ({
  ...state,
  registration,
  isLoading: false,
})
export const registerFailed = (state, { message }) => ({
  ...state,
  alert: { showAlert: true, message },
  isLoading: false,
})
export const hideAlert = state => ({ ...state, alert: NO_ALERTS })
export const verifyEmployeePhotoFailed = (state, { message }) => ({
  ...state,
  alert: { showAlert: true, message },
  isLoading: false,
})
export const saveUser = (state, { user }) => ({ ...state, user })
export const clearUser = state => ({ ...state, user: NOT_LOGGED_IN })
export const setIpIsValid = state => ({ ...state, ipStatus: 'VALID' })
export const setIpIsInvalid = state => ({ ...state, ipStatus: 'INVALID' })
export const setNetworkType = (state, { networkType }) => ({
  ...state,
  networkType,
})
export const setFaceDetectionEnabled = state => ({
  ...state,
  hasFaceDetection: true,
})
export const setFaceDetectionDisabled = state => ({
  ...state,
  hasFaceDetection: false,
})

export const handleSubmitUserRequest = state => ({
  ...state,
  isSubmittingUser: true,
})
export const handleSubmitUserSuccess = (state, { user }) => ({
  ...state,
  isSubmittingUser: false,
  isLoggedIn: false,
  user,
})
export const handleSubmitUserFail = state => ({
  ...state,
  isSubmittingUser: false,
})
