import { MODAL_INITIAL_STATE } from './constants'

import { SET_MODAL, SET_ON_DISMISS_MODAL } from '../../types/modalTypes'

import { setModal, setOnDismissModal } from './handlers'

const actionHandlers = {
  [SET_MODAL]: setModal,
  [SET_ON_DISMISS_MODAL]: setOnDismissModal
}

export const modalReducerConfig = {
  initialState: MODAL_INITIAL_STATE,
  actionHandlers
}
