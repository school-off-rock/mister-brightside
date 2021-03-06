import { AsyncStorage } from "react-native"
import {
  verifyEmployee,
  registerEmployeePhoto,
  verifyIpAddress,
  findEmployeeOnPhoto
} from "../../../services/auth"
import {
  showLoading,
  registerSuccess,
  registerFailed,
  verifyEmployeePhotoFailed,
  hideLoading,
  saveUser,
  clearUser,
  setIpIsValid,
  setIpIsInvalid
} from "../sync/syncAuthActions"
import { verifyEmployeePhoto, trainEmployeePhoto } from "../../../services/user"
import { setModalAction } from "../sync/syncModalAction"
import { MODAL } from "../../../constants/modals"
import {
  VERIFY_USER_FAIL_TITLE,
  ERROR_NO_PERSON_ON_IMAGE,
  ERROR_ID_MISMATCH_IMAGE,
  ERROR_TOO_MUCH_PERSON_ON_IMAGE,
  ERROR_IMAGE_MISMATCH_IDS
} from "../../../constants/strings"

export function verifyEmployeeAction(registration) {
  return async dispatch => {
    try {
      dispatch(showLoading())
      // await verifyIpAddress()
      const employee = await verifyEmployee(registration)
      dispatch(hideLoading())
      return employee
    } catch (err) {
      if (err.status === 404) {
        dispatch(registerFailed(VERIFY_USER_FAIL_TITLE))
      } else {
        dispatch(registerFailed(err.message))
      }
      throw err
    }
  }
}

export function registerEmployeeAction(employee, image, navigation) {
  return async dispatch => {
    try {
      dispatch(showLoading())
      // await verifyIpAddress()
      await registerEmployeePhoto(employee, image)
      await AsyncStorage.setItem("employee", JSON.stringify(employee)).then(
        () => {}
      )
      await AsyncStorage.setItem("lastImage", JSON.stringify({ image })).then(
        () => {}
      )
      navigation.setParams({ signUp: false, userName: employee.firstName })
      dispatch(registerSuccess())
    } catch (err) {
      dispatch(registerFailed())
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      } else if (err.message === ERROR_NO_PERSON_ON_IMAGE) {
        dispatch(setModalAction(MODAL.NO_PERSON_ON_IMAGE))
      } else if (err.message === ERROR_TOO_MUCH_PERSON_ON_IMAGE) {
        dispatch(setModalAction(MODAL.TOO_MUCH_PERSON_ON_IMAGE))
      } else if (err.message === ERROR_ID_MISMATCH_IMAGE) {
        dispatch(setModalAction(MODAL.ID_MISMATCH_IMAGE))
      } else {
        dispatch(setModalAction(MODAL.SIGN_UP_PHOTO_FAIL))
      }
      throw err
    }
  }
}

export function verifyIpAddressAction() {
  return async dispatch => {
    try {
      // console.time('IP checking')
      await verifyIpAddress()
      // console.timeEnd('IP checking')
      dispatch(setIpIsValid())
    } catch (err) {
      dispatch(setIpIsInvalid())
      // dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      // console.timeEnd('IP checking')
      throw err
    }
  }
}

export function checkEmployeeOnImageAction(image, navigation) {
  return async dispatch => {
    try {
      // console.log('**Actions iniciando')
      dispatch(showLoading())
      // console.time('** Checando foto')
      const employeeId = await findEmployeeOnPhoto(image)
      // console.timeEnd('** Checando foto')
      // console.time('** Checando matrícula')
      const employee = await verifyEmployee(employeeId)
      // console.timeEnd('** Checando matrícula')
      await AsyncStorage.setItem("employee", JSON.stringify(employee)).then(
        () => {}
      )
      await AsyncStorage.setItem("lastImage", JSON.stringify({ image })).then(
        () => {}
      )
      navigation.setParams({ userName: employee.firstName })
      dispatch(registerSuccess())
      // console.log('**Actions terminando')
    } catch (err) {
      dispatch(registerFailed())
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      } else if (err.message === ERROR_NO_PERSON_ON_IMAGE) {
        dispatch(setModalAction(MODAL.NO_PERSON_ON_IMAGE))
      } else if (err.message === ERROR_TOO_MUCH_PERSON_ON_IMAGE) {
        dispatch(setModalAction(MODAL.TOO_MUCH_PERSON_ON_IMAGE))
      } else if (err.message === ERROR_ID_MISMATCH_IMAGE) {
        dispatch(setModalAction(MODAL.ID_MISMATCH_IMAGE))
      } else if (err.message === ERROR_IMAGE_MISMATCH_IDS) {
        dispatch(setModalAction(MODAL.IMAGE_MISMATCH_IDS))
      } else {
        dispatch(setModalAction(MODAL.SIGN_UP_PHOTO_FAIL))
      }
      throw err
    }
  }
}

export function verifyEmployeePhotoAction(image) {
  return async dispatch => {
    try {
      dispatch(showLoading())
      // await verifyIpAddress()
      await verifyEmployeePhoto(image)
      await AsyncStorage.setItem("lastImage", JSON.stringify({ image })).then(
        () => {}
      )
      dispatch(hideLoading())
    } catch (err) {
      dispatch(hideLoading())
      dispatch(verifyEmployeePhotoFailed(err.message))
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      } else if (err.message === ERROR_NO_PERSON_ON_IMAGE) {
        dispatch(setModalAction(MODAL.NO_PERSON_ON_IMAGE))
      } else if (err.message === ERROR_TOO_MUCH_PERSON_ON_IMAGE) {
        dispatch(setModalAction(MODAL.TOO_MUCH_PERSON_ON_IMAGE))
      } else if (err.message === ERROR_ID_MISMATCH_IMAGE) {
        dispatch(setModalAction(MODAL.ID_MISMATCH_IMAGE))
      } else {
        dispatch(setModalAction(MODAL.SIGN_UP_PHOTO_FAIL))
      }
      throw err
    }
  }
}

export function trainEmployeePhotoAction(image) {
  return async dispatch => {
    try {
      dispatch(showLoading())
      // await verifyIpAddress()
      await trainEmployeePhoto(image)
      await AsyncStorage.setItem("lastImage", JSON.stringify({ image })).then(
        () => {}
      )
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
  return async dispatch => {
    try {
      // await verifyIpAddress()
      const employee = await verifyEmployee(registration)
      await AsyncStorage.setItem("employee", JSON.stringify({ employee })).then(
        () => {}
      )
      dispatch(saveUser(employee))
    } catch (err) {
      throw err
    }
  }
}

export function clearUserAction() {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem("employee")
      dispatch(clearUser())
    } catch (err) {
      throw err
    }
  }
}
