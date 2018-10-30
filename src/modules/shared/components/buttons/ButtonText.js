import React from 'react'
import { Text, Platform, StyleSheet } from 'react-native'

import { bool, string, func } from 'prop-types'
import { Touchable } from '../Touchable'

import { styles } from '../styles/button.style'
import { textPropTypes } from '../../propTypes/textPropTypes'

export const ButtonText = ({
  title,
  onPress,
  containerStyle,
  contentStyle,
  upperCase,
  borderless,
}) => {
  const textToDisplay = (Platform.OS === 'android' || upperCase) ? title.toUpperCase() : title
  return (
    <Touchable borderless={borderless} onPress={onPress} style={StyleSheet.flatten([styles.buttonNavbarWrap, containerStyle])}>
      <Text style={[styles.textSecondaryButton, contentStyle]}>{textToDisplay}</Text>
    </Touchable>
  )
}

ButtonText.propTypes = {
  borderless: bool,
  containerStyle: textPropTypes,
  contentStyle: textPropTypes,
  onPress: func,
  title: string.isRequired,
  upperCase: bool,
}
ButtonText.defaultProps = {
  borderless: false,
  containerStyle: {},
  contentStyle: {},
  onPress: () => {},
  upperCase: false,
}
