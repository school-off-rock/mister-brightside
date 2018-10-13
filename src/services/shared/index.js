import { GET_IP_ADDRESS } from '../../constants/routes'
import { verifyResponse } from '../../config/functions'

export const getIpAddress = async () => {
  return fetch(GET_IP_ADDRESS, {
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
