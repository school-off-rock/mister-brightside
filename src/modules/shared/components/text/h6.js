import React from 'react'
import { Text } from 'react-native'
import { string } from 'prop-types'

import { FONTS } from '../../../../constants/theme'

import { textPropTypes } from '../../propTypes'

export const H6 = ({ children, style }) => <Text style={[FONTS.standardStyle.h6, style]}>{children}</Text>

H6.propTypes = { children: string, style: textPropTypes }
H6.defaultProps = { children: '', style: {} }
