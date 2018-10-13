import { verifyResponse } from '../../config/functions'
import {
  VERIFY_EMPLOYEE_REGISTRATION,
  REGISTER_EMPLOYEE_PHOTO,
  VERIFY_IP_ADDRESS
} from '../../constants/routes'
import { Values } from '../../constants/values'
import { getIpAddress } from '../shared'

const {
  KAIROS_SCHOOL_GALERY_NAME,
  KAIROS_API_ID,
  KAIROS_API_KEY
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


export const registerEmployeePhoto = async (registration, image) => {
  return fetch(REGISTER_EMPLOYEE_PHOTO, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      app_id: KAIROS_API_ID,
      app_key: KAIROS_API_KEY
    },
    body: JSON.stringify({
      subject_id: registration,
      image,
      galery_name: KAIROS_SCHOOL_GALERY_NAME
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
