import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'

import { BlurView } from 'react-native-blur'

import { COLORS } from '../../../constants/theme'

export const ViewBlurDark = ({ children, style, ...props }) => Platform.select({
  ios: () => (
    <BlurView
      blurType="dark"
      style={[style]}
      {...props}
    >
      {children}
    </BlurView>
  ),
  android: () => <View style={[s.container, style]} {...props}>{children}</View>,
})()

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DARK_OVERLAY
  }
})
