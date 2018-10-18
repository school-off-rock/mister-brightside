import { SAVE_NAVBAR_HEIGHT } from '../../types/navBarTypes'

import { saveNavBarHeight } from './handlers'

const actionHandlers = {
  [SAVE_NAVBAR_HEIGHT]: saveNavBarHeight,
}

export const navBarReducerConfig = {
  initialState: { height: 0 },
  actionHandlers
}
