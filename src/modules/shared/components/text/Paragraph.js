import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { bool, string } from 'prop-types'
import { FONTS } from '../../../../constants/theme'

const { pEmphasis, p } = FONTS.standardStyle

export const Paragraph = ({
  children,
  emphasis,
  style,
  ...props
}) => {
  const textStyle = emphasis ? pEmphasis : p
  return <Text style={StyleSheet.flatten([textStyle, style])} {...props}>{children}</Text>
}

Paragraph.propTypes = {
  children: string,
  emphasis: bool
}
Paragraph.defaultProps = {
  children: '',
  emphasis: false,
}
