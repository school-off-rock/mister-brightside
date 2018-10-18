import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { bool, string } from 'prop-types'
import { FONTS } from '../../../../constants/theme'

const { captionEmphasis, caption } = FONTS.standardStyle

export const Caption = ({
  children,
  emphasis,
  style,
  ...props
}) => {
  const textStyle = emphasis ? captionEmphasis : caption
  return <Text style={StyleSheet.flatten([textStyle, style])} {...props}>{children}</Text>
}

Caption.propTypes = {
  children: string,
  emphasis: bool
}
Caption.defaultProps = {
  children: '',
  emphasis: false,
}
