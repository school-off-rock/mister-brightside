import React from 'react'
import { Text } from 'react-native'
import { string } from 'prop-types'

import { FONTS } from '../../../../constants/theme'

import { textPropTypes } from '../../propTypes'

export const H2 = ({ children, style, ...props }) => (
  <Text style={[FONTS.standardStyle.h2, style]} {...props}>{children}</Text>
)

H2.propTypes = { children: string, style: textPropTypes }
H2.defaultProps = { children: '', style: {} }
