import React from 'react'
import {
  Image, Platform, StyleSheet, View, TouchableWithoutFeedback
} from 'react-native'
import { func } from 'prop-types'

import { IMAGES, METRICS } from '../../../constants/theme'

export const NavBarLogo = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View>
      <Image
        source={IMAGES.logoPath}
        style={s.image}
      />
    </View>
  </TouchableWithoutFeedback>
)

NavBarLogo.propTypes = { onPress: func }
NavBarLogo.defaultProps = { onPress: () => { } }

const s = StyleSheet.create({
  image: {
    height: 32,
    aspectRatio: 4,
    resizeMode: 'contain',
    ...Platform.select({
      android: {
        marginLeft: METRICS.BIT,
      }
    })
  }
})
