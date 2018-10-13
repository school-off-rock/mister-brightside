import thunk from 'redux-thunk'
import { applyMiddleware, createStore as create } from 'redux'

import { rootReducer } from '../redux/reducers'
import { navMiddleware } from '../navigation/navigator'

const middleware = [thunk, navMiddleware]

export const createStore = () => {
  return create(rootReducer, applyMiddleware(...middleware))
}
