import React from 'react'
import {
  StyleSheet, View, TouchableWithoutFeedback, Text
} from 'react-native'
import { func, string } from 'prop-types'

import { METRICS, COLORS, FONTS } from '../../../constants/theme'

export const NavBarRight = ({ onPress, title }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View>
      <Text style={s.text}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
)

NavBarRight.propTypes = { onPress: func, title: string }
NavBarRight.defaultProps = { onPress: () => { }, title: 'Ajuda' }

const s = StyleSheet.create({
  text: {
    marginRight: METRICS.BIT,
    color: COLORS.PRIMARY,
    ...FONTS.type.medium
  }
})
