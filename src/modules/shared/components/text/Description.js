import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { bool, string } from 'prop-types'
import { FONTS } from '../../../../constants/theme'

const { descriptionEmphasis, description } = FONTS.standardStyle

export const Description = ({
  children,
  emphasis,
  style,
  ...props
}) => {
  const textStyle = emphasis ? descriptionEmphasis : description
  return <Text style={StyleSheet.flatten([textStyle, style])} {...props}>{children}</Text>
}

Description.propTypes = {
  children: string,
  emphasis: bool
}
Description.defaultProps = {
  children: '',
  emphasis: false,
}
