import React from 'react'
import { any, func } from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { isFunctionEmpty } from '../../../config/functions'


export const Touchable = (props) => {
  const { onPress, children } = props
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

Touchable.defaultProps = {
  children: null,
  onPress: () => {},
}

Touchable.propTypes = {
  children: any,
  onPress: func,
}
