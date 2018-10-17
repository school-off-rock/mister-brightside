import { verifyResponse } from '../../config/functions'
import {
  VERIFY_EMPLOYEE_REGISTRATION,
  REGISTER_EMPLOYEE_PHOTO,
  VERIFY_IP_ADDRESS
} from '../../constants/routes'
import { Values } from '../../constants/values'
import { getIpAddress } from '../shared'

const {
  FRAPI_API_KEY
} = Values

export const verifyEmployee = async (registration) => {
  return fetch(VERIFY_EMPLOYEE_REGISTRATION(registration), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}


export const registerEmployeePhoto = async ({ registration }, imageB64) => {
  return fetch(REGISTER_EMPLOYEE_PHOTO, {
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
      return response
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
      throw { valid, message: 'Seu endrereço de IP não possui permissão' }
    })
    .catch((error) => {
      throw error
    })
}
