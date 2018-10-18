import {
  REGISTER_EMPLOYEE_ENTRY,
  GET_EMPLOYEE_CLOCK_ENTRIES,
  VERIFY_EMPLOYEE_PHOTO,
  TRAIN_EMPLOYEE_PHOTO
} from '../../constants/routes'
import { Values } from '../../constants/values'
import { verifyResponse, getUserRegistration, mapClockHistory } from '../../config/functions'
import { ClockEntry } from '../../domain/ClockEntry'

const {
  FRAPI_API_KEY
} = Values

export const registerEmployeeEntry = async () => {
  const { registration } = await getUserRegistration()
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
  const { registration } = await getUserRegistration()
  return fetch(GET_EMPLOYEE_CLOCK_ENTRIES(registration, initDate, endDate), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then(async (response) => {
      const clockEntries = response.map(item => new ClockEntry(item))
      const clockEntriesSections = await mapClockHistory(clockEntries)
      return clockEntriesSections
    })
    .catch((error) => {
      throw error
    })
}

export const verifyEmployeePhoto = async (imageB64) => {
  const { registration } = await getUserRegistration()
  return fetch(VERIFY_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY
    },
    body: JSON.stringify({
      imageB64,
      label: registration
    })
  }).then(resp => verifyResponse(resp))
    .then(({ people = [] }) => {
      const [personData = {}] = people
      const { recognition = {} } = personData
      const { confidence } = recognition
      if (confidence >= 60) {
        return personData
      }
      throw { message: 'Rosto não reconhecido', status: 404 }
    })
    .catch((err) => {
      throw err
    })
}

export const trainEmployeePhoto = async (imageB64) => {
  const { registration } = await getUserRegistration()
  return fetch(TRAIN_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY
    },
    body: JSON.stringify({
      imageB64,
      label: registration
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw err
    })
}
