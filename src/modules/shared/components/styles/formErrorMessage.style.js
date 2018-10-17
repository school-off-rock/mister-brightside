import { StyleSheet } from 'react-native'
import { COLORS, FONTS, METRICS } from '../../../../constants/theme'

export const styles = StyleSheet.create({
  errorMessage: {
    ...FONTS.style.footNote,
    color: COLORS.ALERT,
    marginHorizontal: METRICS.MEGA,
    paddingVertical: METRICS.NANO,
    textAlign: 'center',
  }
})
