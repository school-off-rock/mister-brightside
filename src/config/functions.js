import { AsyncStorage } from 'react-native'
import _ from 'lodash'

export async function verifyResponse(response) {
  if (response.status !== 200 && response.status !== 201) {
    if (response.status === 401) {
      response.message = 'Usuário não encontrado!'
      throw await response.json()
    }
    if (response.status === 403) {
      response.message = 'Erro de autenticação!'
      throw await response
    }
    throw await response.json()
  } else {
    return response.json()
  }
}

export async function getUserRegistration() {
  let userJson
  await AsyncStorage.getItem('registration')
    .then((profile) => {
      if (profile) {
        userJson = JSON.parse(profile)
      } else {
        userJson = {}
      }
    }).catch((err) => {
      userJson = { err }
    })

  return userJson
}

export const isFunctionEmpty = f => /^function[^{]+\{\s*\}/m.test(f.toString())
export const hasText = prop => (typeof prop === 'string' && prop !== '')

export function mapClockHistory(historyList) {
  const obj = _.groupBy(historyList, 'date')
  const keys = Object.keys(obj)
  const size = Object.keys(obj).length
  const history = []
  for (let i = 0; i < size; i += 1) {
    history[keys[size - (i + 1)]] = obj[keys[size - (i + 1)]]
    history[keys[size - (i + 1)]] = history[keys[size - (i + 1)]]
  }
  const newArray = []
  for (let i = 0; i < size; i += 1) {
    newArray.push({
      data: history[keys[size - (i + 1)]],
      title: keys[size - (i + 1)]
    })
  }
  return newArray
}
