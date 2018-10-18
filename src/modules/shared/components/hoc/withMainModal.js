import React from 'react'
import { View } from 'react-native'

import { COLORS } from '../../../../constants/theme'
import { ModalMain } from '../../containers/ModalMain'

export const withModal = Component => ({ ...props }) => (
  <View style={{ flex: 1, backgroundColor: COLORS.SCREEN }}>
    <Component {...props} />
    <ModalMain />
  </View>
)
