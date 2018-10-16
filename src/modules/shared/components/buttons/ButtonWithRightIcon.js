import React from 'react'
import { Text, Platform, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { bool, string, func } from 'prop-types'
import { Touchable } from '../Touchable'
import { styles } from '../styles/button.style'
import { COLORS, METRICS } from '../../../../constants/theme'
import { textPropTypes } from '../../propTypes/textPropTypes'

export const ButtonWithRightIcon = ({
  title,
  onPress,
  containerStyle,
  contentStyle,
  upperCase,
  borderless,
  iconName,
  disabled
}) => {
  const textToDisplay = (Platform.OS === 'android' || upperCase) ? title.toUpperCase() : title
  const iconColor = disabled ? COLORS.BLACK_SECONDARY : COLORS.PRIMARY
  return (
    <Touchable
      style={StyleSheet.flatten([styles.buttonRightIcon, containerStyle])}
      disabled={disabled}
      borderless={borderless}
      onPress={onPress}
    >
      <Text style={[styles.textSecondaryButton, { color: iconColor }, contentStyle]}>{textToDisplay}</Text>
      <Icon
        color={iconColor}
        size={METRICS.ICONS.medium}
        name={iconName}
      />
    </Touchable>
  )
}

ButtonWithRightIcon.propTypes = {
  borderless: bool,
  containerStyle: textPropTypes,
  contentStyle: textPropTypes,
  onPress: func,
  title: string.isRequired,
  upperCase: bool,
  iconName: string,
  disabled: bool,
}
ButtonWithRightIcon.defaultProps = {
  borderless: true,
  containerStyle: {},
  contentStyle: {},
  onPress: () => {},
  upperCase: false,
  iconName: '',
  disabled: false,
}
