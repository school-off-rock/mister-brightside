import { StyleSheet } from 'react-native'
import { FONTS, METRICS } from '../../../../../constants/theme'

export const rowStyles = StyleSheet.create({
  fill: {
    flex: 1
  },

  loadingContainer: {
    minHeight: METRICS.LOADING_CONTAINER_HEIGHT,
    justifyContent: 'center',
    paddingVertical: METRICS.BIT,
  },

  text: {
    marginVertical: METRICS.BYTE,
    ...FONTS.standardStyle.pEmphasis
  },

  textSecondary: {
    marginVertical: METRICS.BYTE,
    ...FONTS.standardStyle.p
  },

  iconWrap: {
    alignItems: 'center',
    height: METRICS.ICON_TOUCHABLE_AREA_DENSE,
    justifyContent: 'center',
    marginHorizontal: METRICS.BIT,
    width: METRICS.ICON_TOUCHABLE_AREA_DENSE,
  },

  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
