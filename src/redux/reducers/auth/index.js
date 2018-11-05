import { AUTH_INITIAL_STATE } from './constants'
import {
  SHOW_AUTH_LOADING,
  HIDE_AUTH_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  HIDE_ALERT,
  VERIFY_EMPLOYEE_PHOTO_FAILED,
  SAVE_USER,
  CLEAR_USER
} from '../../types/authTypes'
import {
  showLoading,
  hideLoading,
  registerSuccess,
  registerFailed,
  hideAlert,
  verifyEmployeePhotoFailed,
  saveUser,
  clearUser
} from './handlers'

export const actionHandlers = {
  [SHOW_AUTH_LOADING]: showLoading,
  [HIDE_AUTH_LOADING]: hideLoading,
  [REGISTER_SUCCESS]: registerSuccess,
  [REGISTER_FAILED]: registerFailed,
  [HIDE_ALERT]: hideAlert,
  [VERIFY_EMPLOYEE_PHOTO_FAILED]: verifyEmployeePhotoFailed,
  [SAVE_USER]: saveUser,
  [CLEAR_USER]: clearUser,
}

export const authReducerConfig = {
  initialState: AUTH_INITIAL_STATE,
  actionHandlers
}
