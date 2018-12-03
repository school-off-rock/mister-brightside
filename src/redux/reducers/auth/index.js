import { AUTH_INITIAL_STATE } from './constants'
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
  SET_NETWORK_TYPE,
  SET_FACE_DETECTION_ENABLED,
  SET_FACE_DETECTION_DISABLED
} from '../../types/authTypes'
import {
  showLoading,
  hideLoading,
  registerSuccess,
  registerFailed,
  hideAlert,
  verifyEmployeePhotoFailed,
  saveUser,
  clearUser,
  setIpIsValid,
  setIpIsInvalid,
  setNetworkType,
  setFaceDetectionEnabled,
  setFaceDetectionDisabled
} from './handlers'

export const actionHandlers = {
  [SET_IP_IS_VALID]: setIpIsValid,
  [SET_IP_IS_INVALID]: setIpIsInvalid,
  [SHOW_AUTH_LOADING]: showLoading,
  [HIDE_AUTH_LOADING]: hideLoading,
  [REGISTER_SUCCESS]: registerSuccess,
  [REGISTER_FAILED]: registerFailed,
  [HIDE_ALERT]: hideAlert,
  [VERIFY_EMPLOYEE_PHOTO_FAILED]: verifyEmployeePhotoFailed,
  [SAVE_USER]: saveUser,
  [CLEAR_USER]: clearUser,
  [SET_NETWORK_TYPE]: setNetworkType,
  [SET_FACE_DETECTION_ENABLED]: setFaceDetectionEnabled,
  [SET_FACE_DETECTION_DISABLED]: setFaceDetectionDisabled
}

export const authReducerConfig = {
  initialState: AUTH_INITIAL_STATE,
  actionHandlers
}
