import thunk from 'redux-thunk'
import { applyMiddleware, createStore as create } from 'redux'

import { rootReducer } from '../redux/reducers'
import { navMiddleware } from '../navigation/navigator'
import screenTracking from './screenTracking'

const middleware = [thunk, navMiddleware, screenTracking]

export const createStore = () => {
  return create(rootReducer, applyMiddleware(...middleware))
}
