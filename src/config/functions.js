import React from "react"
import { AsyncStorage, Linking, Platform } from "react-native"
import _ from "lodash"
import { Values, livenessThreshold } from "../constants/values"
import { NavBarLogo } from "../modules/shared/components/NavBarLogo"
import { NavBarRight } from "../modules/shared/components/NavBarRight"

export async function verifyResponse(response) {
  if (response.status !== 200 && response.status !== 201) {
    if (response.status === 401) {
      response.message = "Usuário não encontrado"
      throw await response.json()
    }
    if (response.status === 403) {
      response.message = "Erro de autenticação"
      throw await response
    }
    if (response.status === 404) {
      response.message = "Não encontrado"
      throw await response
    }
    throw await response.json()
  } else {
    return response.json()
  }
}

export async function getUserRegistration() {
  let userJson
  await AsyncStorage.getItem("employee")
    .then(profile => {
      if (profile) {
        userJson = JSON.parse(profile)
      } else {
        userJson = {}
      }
    })
    .catch(err => {
      userJson = { err }
    })

  return userJson
}

export const isFunctionEmpty = f => /^function[^{]+\{\s*\}/m.test(f.toString())
export const hasText = prop => typeof prop === "string" && prop !== ""

export function toSentenceCase(name) {
  return `${name.charAt(0).toUpperCase()}${name
    .slice(1, name.length)
    .toLowerCase()}`
}

export function mapClockHistory(historyList) {
  const obj = _.groupBy(historyList, "date")
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

export function generateStandardNavBar(navigation, title, onTitlePress) {
  const standardNavBar = {
    headerLeft: <NavBarLogo onPress={onTitlePress} />,
    headerRight: <NavBarRight title={title} />,
    ...Values.NAV_BAR_STYLES.absolute
  }
  return standardNavBar
}

export const openPhonePad = number => {
  const args = {
    number
  }
  const settings = Object.assign(
    {
      prompt: true
    },
    args
  )

  const url = `${
    Platform.OS === "ios" && settings.prompt ? "telprompt:" : "tel:"
  }${settings.number}`

  return Linking.canOpenURL(url).then(canOpen => {
    if (!canOpen) {
      console.log(canOpen)
    }
    return Linking.openURL(url).catch(err => Promise.reject(err))
  })
}

export const getFaceClassifications = (face, method) => {
  const isMethodSetToSmile = method === "BOTH" || method === "SMILE"
  const isMethodSetToBlink = method === "BOTH" || method === "BLINK"
  const classifications = {}

  if (isMethodSetToSmile && "smilingProbability" in face) {
    classifications.isSmiling =
      face.smilingProbability > livenessThreshold.SMILING
  }
  if (isMethodSetToBlink) {
    if ("leftEyeOpenProbability" in face) {
      classifications.isLeftEyeOpen =
        face.leftEyeOpenProbability > livenessThreshold.OPEN_EYE
    }
    if ("rightEyeOpenProbability" in face) {
      classifications.isRightEyeOpen =
        face.rightEyeOpenProbability > livenessThreshold.OPEN_EYE
    }
  }
  return classifications
}
