import { StyleSheet, Platform } from 'react-native'
import {
  METRICS, FONTS
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
    ...FONTS.style.primaryButton,
  },
  buttonRightIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
