import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'

import { BlurView } from 'react-native-blur'

import { COLORS } from '../../../constants/theme'

export class ViewBlurIOS extends React.Component {
  render() {
    const { children, style, ...props } = this.props
    return (
      Platform.select({
        ios: () => (
          <BlurView
            blurType="light"
            style={[s.container, style]}
            {...props}
          >
            {children}
          </BlurView>
        ),
        android: () => <View style={[s.container, style]} {...props}>{children}</View>,
      })()
    )
  }
}

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_OVERLAY
  }
})
