import React, { Component } from 'react'
import { any, func } from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { isFunctionEmpty } from '../../../config/functions'


export class Touchable extends Component {
  static defaultProps = {
    children: null,
    onPress: () => {},
  }

  static propTypes = {
    children: any,
    onPress: func,
  }

  render() {
    const { onPress, children, ...props } = this.props
    if (isFunctionEmpty(onPress)) {
      return (
        <View {...props}>
          {props.children}
        </View>
      )
    }
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        {children}
      </TouchableOpacity>
    )
  }
}
