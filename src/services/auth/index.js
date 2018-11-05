import { verifyResponse } from '../../config/functions'
import {
  VERIFY_EMPLOYEE_REGISTRATION,
  VERIFY_IP_ADDRESS,
  VERIFY_EMPLOYEE_PHOTO
} from '../../constants/routes'
import { Values } from '../../constants/values'
import { getIpAddress } from '../shared'
import { Employee } from '../../domain/Employee'
import {
  ERROR_NO_PERSON_ON_IMAGE,
  ERROR_ID_MISMATCH_IMAGE,
  ERROR_TOO_MUCH_PERSON_ON_IMAGE,
  ERROR_IMAGE_MISMATCH_IDS,
} from '../../constants/strings'

const { FRAPI_API_KEY } = Values

export const verifyEmployee = async (registration) => {
  return fetch(VERIFY_EMPLOYEE_REGISTRATION(registration), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const employeeVerified = new Employee(response)
      return employeeVerified
    })
    .catch((error) => {
      throw error
    })
}

export const registerEmployeePhoto = async ({ registration }, imageB64) => {
  return fetch(VERIFY_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY
    },
    body: JSON.stringify({
      label: registration,
      imageB64,
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const { people = [] } = response
      if (people.length === 0) {
        throw { message: ERROR_NO_PERSON_ON_IMAGE, status: 404 }
      }
      if (people.length > 1) {
        throw { message: ERROR_TOO_MUCH_PERSON_ON_IMAGE, status: 404 }
      }
      const [personData = {}] = people
      const { recognition = {} } = personData
      const { confidence, predictedLabel } = recognition
      if (confidence >= 60 && predictedLabel === registration) {
        return personData
      }
      throw { message: ERROR_ID_MISMATCH_IMAGE, status: 404 }
    })
    .catch((err) => {
      throw err
    })
}

export const findEmployeeOnPhoto = async (imageB64) => {
  return fetch(VERIFY_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY
    },
    body: JSON.stringify({
      imageB64,
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const { people = [] } = response
      if (people.length === 0) {
        throw { message: ERROR_NO_PERSON_ON_IMAGE, status: 404 }
      }
      if (people.length > 1) {
        throw { message: ERROR_TOO_MUCH_PERSON_ON_IMAGE, status: 404 }
      }
      const [personData = {}] = people
      const { recognition = {} } = personData
      const { confidence, predictedLabel } = recognition
      if (confidence >= 60) {
        return predictedLabel
      }
      throw { message: ERROR_IMAGE_MISMATCH_IDS, status: 404 }
    })
    .catch((err) => {
      throw err
    })
}

export const verifyIpAddress = async () => {
  const { ip } = await getIpAddress()
  return fetch(VERIFY_IP_ADDRESS(ip), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then(({ valid }) => {
      if (valid === 'true') {
        return valid
      }
      throw { ipError: true, valid, message: 'Seu endereço de IP não possui permissão de acesso ao aplicativo' }
    })
    .catch((error) => {
      throw error
    })
}
