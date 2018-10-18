import React from 'react'
import { View, StatusBar } from 'react-native'

import { COLORS } from '../../../../constants/theme'
import { ModalMain } from '../../containers/ModalMain'

export const withModal = Component => ({ ...props }) => (
  <View style={{ flex: 1, backgroundColor: COLORS.SCREEN }}>
    <StatusBar translucent backgroundColor={COLORS.ANDROID_STATUS_BAR} barStyle="dark-content" />
    <Component {...props} />
    <ModalMain />
  </View>
)
