import React from 'react'
import { YellowBox } from 'react-native'
import { App } from './app'
import { createStore } from './config/redux'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RCTVideoManager',
  'Module RCTOneSignalEventEmitter',
])
const store = createStore()

export const MagnoApp = () => <App store={store} />
