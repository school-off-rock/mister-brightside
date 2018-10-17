import { StyleSheet } from 'react-native'
import { COLORS, METRICS } from '../../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN,
    paddingTop: METRICS.NAV_BAR_HEIGHT_LARGE,
  },
  fluid: {
    flex: 1,
  },
  description: {
    textAlign: 'center',
    margin: METRICS.KILO,
  },
  button: {
    justifyContent: 'flex-end',
    padding: METRICS.BYTE
  },
  input: {
    marginHorizontal: METRICS.MEGA,
  },
})
