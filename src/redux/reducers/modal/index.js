import { MODAL_INITIAL_STATE } from './constants'

import { SET_MODAL } from '../../types/modalTypes'

import { setModal } from './handlers'

const actionHandlers = {
  [SET_MODAL]: setModal,
}

export const modalReducerConfig = {
  initialState: MODAL_INITIAL_STATE,
  actionHandlers
}
