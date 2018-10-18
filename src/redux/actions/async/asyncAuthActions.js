import {
  AsyncStorage,
} from 'react-native'
import {
  verifyEmployee,
  registerEmployeePhoto,
  verifyIpAddress
} from '../../../services/auth'
import {
  showLoading,
  registerSuccess,
  registerFailed,
  verifyEmployeePhotoFailed,
  hideLoading,
  saveUser
} from '../sync/syncAuthActions'
import { verifyEmployeePhoto, trainEmployeePhoto } from '../../../services/user'
import { setModalAction } from '../sync/syncModalAction'
import { MODAL } from '../../../constants/modals'

export function verifyEmployeeAction(registration) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await verifyIpAddress()
      const employee = await verifyEmployee(registration)
      dispatch(hideLoading())
      return employee
    } catch (err) {
      dispatch(registerFailed(err.message))
      throw err
    }
  }
}

export function registerEmployeeAction(employee, image, navigation) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await verifyIpAddress()
      await registerEmployeePhoto(employee, image)
      await AsyncStorage.setItem('employee', JSON.stringify(employee)).then(() => { })
      await AsyncStorage.setItem('lastImage', JSON.stringify({ image })).then(() => { })
      navigation.setParams({ signUp: false })
      dispatch(registerSuccess())
    } catch (err) {
      dispatch(registerFailed(err.message))
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      }
      throw err
    }
  }
}

export function verifyEmployeePhotoAction(image) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await verifyIpAddress()
      await verifyEmployeePhoto(image)
      await AsyncStorage.setItem('lastImage', JSON.stringify({ image })).then(() => { })
      dispatch(hideLoading())
    } catch (err) {
      dispatch(hideLoading())
      dispatch(verifyEmployeePhotoFailed(err.message))
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      } else {
        dispatch(setModalAction(MODAL.USER_RECOGNITION_FAIL))
      }
      throw err
    }
  }
}

export function trainEmployeePhotoAction(image) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await verifyIpAddress()
      await trainEmployeePhoto(image)
      await AsyncStorage.setItem('lastImage', JSON.stringify({ image })).then(() => { })
      dispatch(hideLoading())
      dispatch(setModalAction(MODAL.TRAIN_PHOTO_SUCCESS))
    } catch (err) {
      dispatch(hideLoading())
      dispatch(verifyEmployeePhotoFailed(err.message))
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      } else {
        dispatch(setModalAction(MODAL.USER_RECOGNITION_FAIL))
      }
      throw err
    }
  }
}

export function fetchEmployeeAction(registration) {
  return async (dispatch) => {
    try {
      await verifyIpAddress()
      const employee = await verifyEmployee(registration)
      await AsyncStorage.setItem('employee', JSON.stringify({ employee })).then(() => { })
      dispatch(saveUser(employee))
    } catch (err) {
      throw err
    }
  }
}
