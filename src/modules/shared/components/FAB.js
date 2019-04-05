import React from 'react'
import { Platform } from 'react-native'
import glamorous from 'glamorous-native'
import Touchable from 'react-native-platform-touchable'

const hasRipple = Platform.OS === 'android' && Platform.Version > 19

export const FabWrap = glamorous.view(
  (props, theme) =>
    hasRipple && {
      borderRadius: theme.fabRadius,
      overflow: 'hidden',
      elevation: 6,
      backgroundColor: theme.colors.primary,
    }
)

export const FabBackground = glamorous.view((props, theme) =>
  hasRipple
    ? {
        width: theme.fabSize,
        aspectRatio: theme.ratio.square,
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {
        backgroundColor: theme.colors.primary,
        width: theme.fabSize,
        borderRadius: theme.fabRadius,
        aspectRatio: theme.ratio.square,
        alignItems: 'center',
        justifyContent: 'center',
      }
)

export function FAB({ onPress, children }) {
  return (
    <FabWrap>
      <Touchable
        foreground={Touchable.SelectableBackground()}
        onPress={onPress}
      >
        <FabBackground>{children}</FabBackground>
      </Touchable>
    </FabWrap>
  )
}
