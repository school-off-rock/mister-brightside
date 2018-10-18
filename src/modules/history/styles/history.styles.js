import { StyleSheet } from 'react-native'
import { COLORS, METRICS, FONTS } from '../../../constants/theme'

export const styles = StyleSheet.create({
  underline: {
    borderBottomColor: COLORS.DARK_DIVIDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerRowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pickerSelectorLabelWrap: {
    backgroundColor: COLORS.SUCCESS,
    height: METRICS.CHIP_HEIGHT,
    borderRadius: METRICS.CHIP_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: METRICS.KILO,
    borderColor: COLORS.DARK_DIVIDER,
    borderWidth: StyleSheet.hairlineWidth,
    margin: METRICS.BIT,
  },
  pickerSelectorLabel: {
    color: COLORS.ON_SUCCESS,
    ...FONTS.type.medium
  },
  sectionTitle: {
    flex: 1,
    paddingHorizontal: METRICS.BYTE,
    paddingVertical: METRICS.BIT,
    backgroundColor: COLORS.SCREEN,
  },
})
