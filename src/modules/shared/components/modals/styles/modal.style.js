import { StyleSheet, Platform } from 'react-native'
import {
  METRICS,
  COLORS,
  FONTS
} from '../../../../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: METRICS.TERA,
  },
  blur: {
    backgroundColor: COLORS.SURFACE_OPACITY,
    borderRadius: METRICS.BORDER_RADIUS,
    alignItems: 'center',
    paddingVertical: METRICS.BYTE,
    paddingHorizontal: METRICS.KILO,
    ...Platform.select({
      android: {
        elevation: 24,
      }
    })
  },
  title: {
    ...FONTS.standardStyle.pEmphasis,
    ...FONTS.type.medium,
    paddingTop: METRICS.BIT,
    textAlign: 'center',
  },
  description: {
    ...FONTS.standardStyle.description,
    marginTop: METRICS.BIT,
    textAlign: 'center',
  },
  icon: {
    paddingVertical: METRICS.BIT,
  },
  buttonWrap: {
    marginTop: METRICS.BIT,
  },
  button: {
    paddingVertical: METRICS.KILO,
    paddingHorizontal: METRICS.GIGA,
  },
  buttonContainer: {
    flexDirection: 'row',
  }
})
