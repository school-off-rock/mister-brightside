import { StyleSheet, Platform } from 'react-native'
import { COLORS, METRICS, FONTS } from '../../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PURE_BLACK,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
  },
  spinnerAbsoluteCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    ...Platform.select({
      ios: {
        transform: [{ translateY: 1 }, { translateX: 2 }],
      },
    }),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    top: null,
    ...Platform.select({
      android: {
        backgroundColor: COLORS.SURFACE_OPACITY,
      },
    }),
  },
  bottomOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: null,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  captureWrap: {
    borderWidth: METRICS.NANO,
    borderColor: COLORS.SURFACE,
    borderRadius: METRICS.TERA,
    margin: METRICS.MEGA,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: COLORS.DARK_DIVIDER,
        shadowOffset: { height: 2 },
        shadowRadius: 2,
      },
    }),
  },
  capture: {
    backgroundColor: COLORS.SURFACE,
    width: METRICS.SNAP_BUTTON,
    aspectRatio: 1,
    borderRadius: METRICS.SNAP_RADIUS,
    margin: METRICS.NANO,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: COLORS.DARK_DIVIDER,
        shadowOffset: { height: 2 },
        shadowRadius: 2,
      },
    }),
  },
  captureDisabled: {
    backgroundColor: COLORS.LIGHT_OVERLAY,
    width: METRICS.SNAP_BUTTON,
    aspectRatio: 1,
    borderRadius: METRICS.SNAP_RADIUS,
    margin: METRICS.NANO,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: COLORS.DARK_DIVIDER,
        shadowOffset: { height: 2 },
        shadowRadius: 2,
      },
    }),
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
  },
  countdownText: {
    textAlign: 'center',
    margin: METRICS.KILO,
    ...FONTS.standardStyle.p,
  },
  countdownTextBold: {
    textAlign: 'center',
    margin: METRICS.KILO,
    ...FONTS.standardStyle.pEmphasis,
    ...FONTS.type.medium,
  },
  faceRecognitionText: {
    textAlign: 'center',
    marginTop: METRICS.KILO,
    marginHorizontal: METRICS.KILO,
    ...FONTS.standardStyle.pEmphasis,
  },
  faceRecognitionSubtitle: {
    textAlign: 'center',
    marginHorizontal: METRICS.KILO,
    marginBottom: METRICS.KILO,
    ...FONTS.standardStyle.description,
  },
  faceRecognitionDisabledText: {
    textAlign: 'center',
    marginTop: METRICS.KILO,
    marginHorizontal: METRICS.KILO,
    ...FONTS.standardStyle.p,
    color: COLORS.BLACK_DEACTIVATED_ALT,
  },
  faceRecognitionDisabledSubtitle: {
    textAlign: 'center',
    marginHorizontal: METRICS.KILO,
    marginBottom: METRICS.KILO,
    ...FONTS.standardStyle.description,
    color: COLORS.BLACK_DEACTIVATED_ALT,
  },

  signUpCameraWrap: {
    ...StyleSheet.absoluteFillObject,
    top: null,
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  signUpCameraTitle: {
    color: 'white',
    marginBottom: 8,
  },
  signUpCameraDescription: {
    color: 'white',
  },
  signUpButtonRow: {
    marginTop: METRICS.MEGA,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
