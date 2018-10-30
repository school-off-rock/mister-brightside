import { MODAL_INITIAL_STATE } from '../redux/reducers/modal/constants'

import {
  SIGN_UP_PHOTO_FAIL_TITLE,
  SIGN_UP_PHOTO_FAIL_DESCRIPTION,
  CLOCK_IN_SUCCESS_TITLE,
  CLOCK_IN_SUCCESS_DESCRIPTION,
  CLOCK_IN_FAIL_DESCRIPTION,
  CLOCK_IN_FAIL_TITLE,
  USER_RECOGNITION_FAIL_DESCRIPTION,
  USER_RECOGNITION_FAIL_TITLE,
  HELP_MODAL_TITLE,
  HELP_MODAL_DESCRIPTION,
  HELP_MODAL_ACTION_LABEL,
  TRAIN_PHOTO_SUCCESS_TITLE,
  TRAIN_PHOTO_SUCCESS_DESCRIPTION,
  IP_VALIDATION_FAIL_TITLE,
  IP_VALIDATION_FAIL_DESCRIPTION,
  NO_PERSON_ON_IMAGE_TITLE,
  NO_PERSON_ON_IMAGE_DESCRIPTION,
  SIGN_ID_MISMATCH_IMAGE_TITLE,
  SIGN_ID_MISMATCH_IMAGE_DESCRIPTION,
  TOO_MUCH_PERSON_ON_IMAGE_DESCRIPTION,
  TOO_MUCH_PERSON_ON_IMAGE_TITLE,
} from './strings'

const success = {
  isVisible: true,
  theme: 'SUCCESS',
  buttonLabel: 'Fechar'
}

const fail = {
  isVisible: true,
  theme: 'ALERT',
  buttonLabel: 'Fechar'
}

const primary = {
  isVisible: true,
  theme: 'PRIMARY',
  buttonLabel: 'Fechar'
}

const DISMISS = MODAL_INITIAL_STATE

const HELP = onAction => ({
  ...primary,
  onAction,
  title: HELP_MODAL_TITLE,
  description: HELP_MODAL_DESCRIPTION,
  iconName: 'phone-in-talk',
  actionButtonLabel: HELP_MODAL_ACTION_LABEL,
})

const SIGN_UP_PHOTO_FAIL = {
  ...fail,
  title: SIGN_UP_PHOTO_FAIL_TITLE,
  description: SIGN_UP_PHOTO_FAIL_DESCRIPTION,
  iconName: 'alert-circle',
  buttonLabel: 'Tentar novamente',
}

const CLOCK_IN_SUCCESS = {
  ...success,
  title: CLOCK_IN_SUCCESS_TITLE,
  description: CLOCK_IN_SUCCESS_DESCRIPTION,
  iconName: 'map-marker-radius',
}

const CLOCK_IN_FAIL = {
  ...fail,
  title: CLOCK_IN_FAIL_TITLE,
  description: CLOCK_IN_FAIL_DESCRIPTION,
  iconName: 'alert-circle',
  buttonLabel: 'Tentar novamente',
}

const NO_PERSON_ON_IMAGE = {
  ...fail,
  title: NO_PERSON_ON_IMAGE_TITLE,
  description: NO_PERSON_ON_IMAGE_DESCRIPTION,
  iconName: 'face',
  buttonLabel: 'Tentar novamente',
}

const TOO_MUCH_PERSON_ON_IMAGE = {
  ...fail,
  title: TOO_MUCH_PERSON_ON_IMAGE_TITLE,
  description: TOO_MUCH_PERSON_ON_IMAGE_DESCRIPTION,
  iconName: 'account-multiple',
  buttonLabel: 'Tentar novamente',
}

const ID_MISMATCH_IMAGE = {
  ...fail,
  title: SIGN_ID_MISMATCH_IMAGE_TITLE,
  description: SIGN_ID_MISMATCH_IMAGE_DESCRIPTION,
  iconName: 'face',
}

const USER_RECOGNITION_FAIL = {
  ...fail,
  title: USER_RECOGNITION_FAIL_TITLE,
  description: USER_RECOGNITION_FAIL_DESCRIPTION,
  iconName: 'alert-circle',
  buttonLabel: 'Tentar novamente',
}

const TRAIN_PHOTO_SUCCESS = {
  ...success,
  title: TRAIN_PHOTO_SUCCESS_TITLE,
  description: TRAIN_PHOTO_SUCCESS_DESCRIPTION,
  iconName: 'creation',
}

const IP_VALIDATION_FAIL = {
  ...fail,
  title: IP_VALIDATION_FAIL_TITLE,
  description: IP_VALIDATION_FAIL_DESCRIPTION,
  iconName: 'map-marker-outline',
  buttonLabel: 'Tentar novamente',
}

export const MODAL = {
  CLOCK_IN_FAIL,
  CLOCK_IN_SUCCESS,
  DISMISS,
  HELP,
  ID_MISMATCH_IMAGE,
  IP_VALIDATION_FAIL,
  NO_PERSON_ON_IMAGE,
  SIGN_UP_PHOTO_FAIL,
  TRAIN_PHOTO_SUCCESS,
  USER_RECOGNITION_FAIL,
  TOO_MUCH_PERSON_ON_IMAGE,
}
