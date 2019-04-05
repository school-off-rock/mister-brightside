import { verifyResponse } from '../../config/functions'
import {
  VERIFY_EMPLOYEE_REGISTRATION,
  VERIFY_IP_ADDRESS,
  VERIFY_EMPLOYEE_PHOTO,
  FIND_USER_ON_IMAGE,
  SUBMIT_NEW_USER,
  GET_USER_INFO,
} from '../../constants/routes'
import { Values } from '../../constants/values'
import { getIpAddress } from '../shared'
import { Employee } from '../../domain/Employee'
import {
  ERROR_NO_PERSON_ON_IMAGE,
  ERROR_ID_MISMATCH_IMAGE,
  ERROR_TOO_MUCH_PERSON_ON_IMAGE,
  ERROR_IMAGE_MISMATCH_IDS,
  ERROR_USER_NOT_FOUND,
} from '../../constants/strings'
import { User } from '../../domain/User'

const { FRAPI_API_KEY } = Values

export const verifyEmployee = async registration => {
  return fetch(VERIFY_EMPLOYEE_REGISTRATION(registration), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(resp => verifyResponse(resp))
    .then(response => {
      const employeeVerified = new Employee(response)
      return employeeVerified
    })
    .catch(error => {
      throw error
    })
}

export const registerEmployeePhoto = async ({ registration }, imageB64) => {
  return fetch(VERIFY_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY,
    },
    body: JSON.stringify({
      label: registration,
      imageB64,
    }),
  })
    .then(resp => verifyResponse(resp))
    .then(response => {
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
    .catch(err => {
      throw err
    })
}

export const findEmployeeOnPhoto = async imageB64 => {
  return fetch(VERIFY_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY,
    },
    body: JSON.stringify({
      imageB64,
    }),
  })
    .then(resp => verifyResponse(resp))
    .then(response => {
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
    .catch(err => {
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
  })
    .then(resp => verifyResponse(resp))
    .then(({ valid }) => {
      if (valid === 'true') {
        return valid
      }
      throw {
        ipError: true,
        valid,
        message:
          'Seu endereço de IP não possui permissão de acesso ao aplicativo',
      }
    })
    .catch(error => {
      throw error
    })
}

// REGISTER
export const findPerson = async imageB64 => {
  return fetch(FIND_USER_ON_IMAGE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY,
    },
    body: JSON.stringify({
      imageB64,
    }),
  })
    .then(resp => verifyResponse(resp))
    .then(response => {
      console.log('TCL: response', response)
      const { people = [] } = response
      if (people.length === 0) {
        throw { message: ERROR_NO_PERSON_ON_IMAGE, status: 404 }
      }
      if (people.length > 1) {
        throw { message: ERROR_TOO_MUCH_PERSON_ON_IMAGE, status: 404 }
      }
      const [personData = {}] = people
      const { recognition = {} } = personData
      const { confidence, predicted_label } = recognition
      if (predicted_label === 'Unknown') {
        throw { message: ERROR_USER_NOT_FOUND, status: 404 }
      }
      if (confidence >= 60) {
        return predicted_label
      }
      throw { message: ERROR_IMAGE_MISMATCH_IDS, status: 404 }
    })
    .catch(err => {
      throw err
    })
}

export const submitNewUser = async (label, imageB64) => {
  return fetch(SUBMIT_NEW_USER, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY,
    },
    body: JSON.stringify({
      label,
      imageB64,
    }),
  })
    .then(resp => verifyResponse(resp))
    .then(({ person_face }) => {
      const newUser = new User(person_face)
      return newUser
    })
    .catch(err => {
      console.log('TCL: submitNewUser -> err', err)
      throw err
    })
}

export const getUserInfo = async label => {
  return fetch(GET_USER_INFO(label), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_key: FRAPI_API_KEY,
    },
  })
    .then(resp => verifyResponse(resp))
    .then(({ person }) => {
      const newUser = new User(person)
      return newUser
    })
    .catch(err => {
      console.log('TCL: submitNewUser -> err', err)
      throw err
    })
}
