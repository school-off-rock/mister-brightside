import {
  REGISTER_EMPLOYEE_ENTRY,
  GET_EMPLOYEE_CLOCK_ENTRIES,
  VERIFY_EMPLOYEE_PHOTO,
  TRAIN_EMPLOYEE_PHOTO
} from '../../constants/routes'
import { Values } from '../../constants/values'
import { verifyResponse, getUserRegistration } from '../../config/functions'
import { ClockEntry } from '../../domain/ClockEntry'

const {
  KAIROS_SCHOOL_GALLERY_NAME,
  KAIROS_API_ID,
  KAIROS_API_KEY
} = Values

export const registerEmployeeEntry = async (registration) => {
  const formData = new FormData()
  formData.append('matricula', registration)
  return fetch(REGISTER_EMPLOYEE_ENTRY, {
    method: 'POST',
    body: formData
  }).then((response) => {
    if (response.status === 200) {
      return response
    }
    throw { message: 'Erro ao registrar ponto' }
  })
    .catch((err) => {
      throw err
    })
}

export const getEmployeeClockEntries = async (initDate, endDate) => {
  const { registration = 902802 } = await getUserRegistration()
  return fetch(GET_EMPLOYEE_CLOCK_ENTRIES(registration, initDate, endDate), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const clockEntries = response.map(item => new ClockEntry(item))
      return clockEntries
    })
    .catch((error) => {
      throw error
    })
}

export const verifyEmployeePhoto = async (image) => {
  return fetch(VERIFY_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_id: KAIROS_API_ID,
      app_key: KAIROS_API_KEY
    },
    body: JSON.stringify({
      image,
      galery_name: KAIROS_SCHOOL_GALLERY_NAME
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw err
    })
}

export const trainEmployeePhoto = async (image) => {
  return fetch(TRAIN_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_id: KAIROS_API_ID,
      app_key: KAIROS_API_KEY
    },
    body: JSON.stringify({
      image,
      galery_name: KAIROS_SCHOOL_GALLERY_NAME
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw err
    })
}
