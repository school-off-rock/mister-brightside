import { StyleSheet } from 'react-native'
import { COLORS, METRICS } from '../../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK,
    flexDirection: 'column'
  },
  preview: {
    flex: 1,
  },
  bottomOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: null,
    backgroundColor: COLORS.LIGHT_OVERLAY,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  captureWrap: {
    borderWidth: METRICS.NANO,
    borderColor: COLORS.SURFACE,
    borderRadius: METRICS.TERA,
    margin: METRICS.KILO
  },
  capture: {
    backgroundColor: COLORS.SURFACE,
    width: METRICS.SNAP_BUTTON,
    aspectRatio: 1,
    borderRadius: METRICS.SNAP_RADIUS,
    margin: METRICS.NANO,
  },
  pendingWrap: {
    alignItems: 'center',
    backgroundColor: COLORS.SCREEN,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: METRICS.GIGA,
  },
  pendingText: {
    marginTop: METRICS.KILO,
    textAlign: 'center',
  }
})
