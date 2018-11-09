import {
  SHOW_AUTH_LOADING,
  HIDE_AUTH_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  HIDE_ALERT,
  VERIFY_EMPLOYEE_PHOTO_FAILED,
  SAVE_USER,
  CLEAR_USER,
  SET_IP_IS_VALID,
  SET_IP_IS_INVALID,
  SET_NETWORK_TYPE
} from '../../types/authTypes'

export const showLoading = () => ({ type: SHOW_AUTH_LOADING })
export const hideLoading = () => ({ type: HIDE_AUTH_LOADING })
export const registerSuccess = registration => ({ type: REGISTER_SUCCESS, registration })
export const registerFailed = message => ({ type: REGISTER_FAILED, message })
export const hideAlert = () => ({ type: HIDE_ALERT })
export const verifyEmployeePhotoFailed = message => ({ type: VERIFY_EMPLOYEE_PHOTO_FAILED, message })
export const saveUser = user => ({ type: SAVE_USER, user })
export const clearUser = () => ({ type: CLEAR_USER })
export const setIpIsValid = () => ({ type: SET_IP_IS_VALID })
export const setIpIsInvalid = () => ({ type: SET_IP_IS_INVALID })
export const setNetworkType = networkType => ({ type: SET_NETWORK_TYPE, networkType })
