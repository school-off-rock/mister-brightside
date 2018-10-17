import { combineReducers } from 'redux'

import { createReducer } from './functionalReducer'
import { navigationReducer } from './nav'
import { authReducerConfig } from './auth'
import { clockEntryReducerConfig } from './clockEntry'
import { navBarReducerConfig } from './navBar'

export const reducers = combineReducers({
  nav: navigationReducer,
  auth: createReducer(authReducerConfig),
  clockEntry: createReducer(clockEntryReducerConfig),
  navBar: createReducer(navBarReducerConfig),
})

export const rootReducer = (state, action) => {
  return reducers(state, action)
}
