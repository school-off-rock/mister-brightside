import { StyleSheet, Platform } from 'react-native'
import { METRICS, COLORS } from '../../../../constants/theme'

const {
  SCREEN,
} = COLORS

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN
  },
  card: {
    ...Platform.select({
      android: {
        marginTop: METRICS.BYTE / 2,
      },
    }),
  },
  cardFlat: {
    backgroundColor: COLORS.SURFACE,
    borderBottomColor: COLORS.DARK_DIVIDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})
