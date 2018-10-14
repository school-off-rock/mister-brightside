import React from 'react'
import { any, func, bool } from 'prop-types'
import { TouchableNativeFeedback, View } from 'react-native'
import { isFunctionEmpty } from '../../../config/functions'
import { viewPropTypes } from '../propTypes/viewPropTypes'

export const Touchable = ({
  children,
  borderless,
  style,
  onPress,
  ...props
}) => {
  if (!isFunctionEmpty(onPress)) {
    const background = borderless
      ? TouchableNativeFeedback.SelectableBackgroundBorderless()
      : TouchableNativeFeedback.SelectableBackground()
    return (
      <TouchableNativeFeedback
        background={background}
        onPress={onPress}
        {...props}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  }
  return <View style={style} {...props}>{children}</View>
}

Touchable.defaultProps = {
  borderless: false,
  children: null,
  onPress: () => {},
  style: {},
}

Touchable.propTypes = {
  borderless: bool,
  children: any,
  onPress: func,
  style: viewPropTypes,
}
