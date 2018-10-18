import { StyleSheet } from 'react-native'
import {
  METRICS,
  COLORS,
  FONTS
} from '../../../../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: METRICS.TERA
  },
  blur: {
    backgroundColor: COLORS.WHITE_SECONDARY_ALT,
    borderRadius: METRICS.BORDER_RADIUS,
    alignItems: 'center',
    paddingVertical: METRICS.BIT,
    paddingHorizontal: METRICS.KILO
  },
  title: {
    ...FONTS.style.title,
    paddingVertical: METRICS.BIT
  },
  description: {
    color: COLORS.BLACK_SECONDARY_ALT,
    paddingVertical: METRICS.BIT,
    textAlign: 'center'
  },
  icon: {
    paddingVertical: METRICS.BIT,
  },
  button: {
    paddingVertical: METRICS.BIT,
    marginHorizontal: METRICS.GIGA
  },
  buttonContainer: {
    paddingVertical: METRICS.BIT,
    flexDirection: 'row',
  }
})
