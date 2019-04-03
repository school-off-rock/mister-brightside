import React from 'react'
import { Text } from 'react-native'
import { string } from 'prop-types'

import { FONTS } from '../../../../constants/theme'

import { textPropTypes } from '../../propTypes'

export const H5 = ({ children, style }) => (
  <Text style={[FONTS.standardStyle.h5, style]}>{children}</Text>
)

H5.propTypes = { children: string, style: textPropTypes }
H5.defaultProps = { children: '', style: {} }
