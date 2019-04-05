import React from 'react'
import glamorous from 'glamorous-native'
import Touchable from 'react-native-platform-touchable'

export const FabWrap = glamorous.view((props, theme) => ({
  borderRadius: theme.fabRadius,
  overflow: 'hidden',
  elevation: 6,
}))

export const FabBackground = glamorous.view((props, theme) => ({
  backgroundColor: theme.colors.primary,
  width: theme.fabSize,
  aspectRatio: theme.ratio.square,
  // borderRadius: theme.fabRadius,
  alignItems: 'center',
  justifyContent: 'center',
}))

export function FAB({ onPress, children }) {
  return (
    <FabWrap>
      <Touchable onPress={onPress}>
        <FabBackground>{children}</FabBackground>
      </Touchable>
    </FabWrap>
  )
}
