import { StyleSheet, Platform } from 'react-native'
import { COLORS } from '../../../../constants/theme'

const { DARK_OVERLAY } = COLORS

export const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: DARK_OVERLAY,
    flex: 1,
    justifyContent: 'center'
  },
  overlayElevation: {
    ...Platform.select({
      android: {
        elevation: 4
      }
    })
  }
})
