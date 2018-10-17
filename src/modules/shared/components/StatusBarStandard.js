import React from 'react'
import { StatusBar, Platform } from 'react-native'

import { COLORS } from '../../../constants/theme'

export const StatusBarStandard = () => (
  <StatusBar
    backgroundColor={COLORS.ANDROID_STATUS_BAR}
    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
    translucent
  />
)
