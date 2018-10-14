import React from 'react'
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'
import { func, any, } from 'prop-types'

import { COLORS, METRICS } from '../../../constants/theme'

export const Card = ({ children, style, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={StyleSheet.flatten([styles.card, style])}>
      {children}
    </View>
  </TouchableWithoutFeedback>
)

Card.defaultProps = {
  onPress: () => { },
  children: null,
  style: {},
}
Card.propTypes = {
  onPress: func,
  children: any,
  style: ViewPropTypes.style,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    ...Platform.select({
      android: {
        elevation: 2,
        // marginVertical: METRICS.NANO / 2,
      },
      ios: {
        borderBottomWidth: METRICS.BORDER_WIDTH,
        borderColor: COLORS.DARK_DIVIDER,
        // marginBottom: METRICS.NANO,
      }
    }),
  }
})
