import { AsyncStorage } from 'react-native'
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
  hideLoading
} from '../sync/syncAuthActions'
import { verifyEmployeePhoto, trainEmployeePhoto } from '../../../services/user'

export function registerEmployeeAction(registration, image) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await verifyIpAddress()
      await verifyEmployee(registration)
      await registerEmployeePhoto(registration, image)
      await AsyncStorage.setItem('registration', JSON.stringify({ registration })).then(() => { })
      await AsyncStorage.setItem('lastImage', JSON.stringify({ image })).then(() => { })
      dispatch(registerSuccess())
    } catch (err) {
      dispatch(registerFailed(err.message))
    }
  }
}

export function verifyEmployeePhotoAction(registration, image) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await verifyIpAddress()
      await verifyEmployeePhoto(registration, image)
      await AsyncStorage.setItem('lastImage', JSON.stringify({ image })).then(() => { })
      dispatch(hideLoading())
    } catch (err) {
      dispatch(hideLoading())
      dispatch(verifyEmployeePhotoFailed(err.message))
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
    } catch (err) {
      dispatch(hideLoading())
      dispatch(verifyEmployeePhotoFailed(err.message))
    }
  }
}
