import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { BlurView } from 'react-native-blur'
import { COLORS } from '../../../../constants/theme'

export function DarkOverlay() {
  return Platform.OS === 'ios' ? (
    <BlurView blurType="dark" style={s.overlay} />
  ) : (
    <View style={s.overlay} />
  )
}

const s = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    ...Platform.select({
      android: {
        backgroundColor: COLORS.DARK_OVERLAY,
      },
    }),
  },
})
