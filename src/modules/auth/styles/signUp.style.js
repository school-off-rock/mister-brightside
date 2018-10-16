import { StyleSheet } from 'react-native'
import { COLORS, METRICS, FONTS } from '../../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN
  },
  description: {
    textAlign: 'center',
    fontSize: FONTS.size.medium,
    alignSelf: 'center'
  },
  button: {
    justifyContent: 'flex-end',
    padding: METRICS.BYTE
  },
})
