import { StyleSheet, Platform } from 'react-native'
import {
  COLORS, METRICS, FONTS
} from '../../../../constants/theme'

const {
  BYTE,
  KILO,
} = METRICS

export const styles = StyleSheet.create({
  buttonNavbarWrap: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: (Platform.OS === 'ios') ? BYTE : KILO,
  },

  textSecondaryButton: {
    ...FONTS.style.secondaryButton,
    color: COLORS.PRIMARY,
  },
})
