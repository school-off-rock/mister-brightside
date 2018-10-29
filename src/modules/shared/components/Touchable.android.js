import React, { Component } from 'react'
import { any, func, bool } from 'prop-types'
import { TouchableNativeFeedback, View } from 'react-native'
import { isFunctionEmpty } from '../../../config/functions'
import { viewPropTypes } from '../propTypes/viewPropTypes'

export class Touchable extends Component {
  static defaultProps = {
    borderless: false,
    children: null,
    onPress: () => {},
    style: {},
  }

  static propTypes = {
    borderless: bool,
    children: any,
    onPress: func,
    style: viewPropTypes,
  }

  render() {
    const {
      children,
      borderless,
      style,
      onPress,
      ...props
    } = this.props
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
}
