import React from 'react'
import { StatusBar } from 'react-native'

import { COLORS } from '../../../constants/theme'

export const StatusBarStandard = () => (
  <StatusBar
    backgroundColor={COLORS.ANDROID_STATUS_BAR}
    barStyle="dark-content"
    translucent
  />
)
