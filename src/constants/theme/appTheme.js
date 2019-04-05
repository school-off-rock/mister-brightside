import { COLORS } from './colors'
import { METRICS } from './metrics'

export const appTheme = {
  colors: {
    primary: COLORS.PRIMARY,
    alert: COLORS.ALERT,
    success: COLORS.SUCCESS,
    positive: COLORS.POSITIVE,
    none: 'transparent',
    background: {
      onPrimary: '#fff',
      screen: COLORS.SCREEN,
      surface: COLORS.SURFACE,
      navBar: COLORS.NAV_BAR.background,
    },
    overlay: {
      light: COLORS.LIGHT_OVERLAY,
      dark: COLORS.DARK_OVERLAY,
    },
    divider: COLORS.DARK_DIVIDER,
    text: {
      darkPrimary: COLORS.BLACK_PRIMARY_ALT,
      darkSecondary: COLORS.BLACK_SECONDARY_ALT,
      darkDeactivated: COLORS.BLACK_DEACTIVATED_ALT,
    },
  },
  module: {
    nano: METRICS.NANO,
    milli: METRICS.MILLI,
    bit: METRICS.BIT,
    byte: METRICS.BYTE,
    kilo: METRICS.KILO,
    mega: METRICS.MEGA,
    giga: METRICS.GIGA,
    tera: METRICS.TERA,
  },
  borderWidth: METRICS.BORDER_WIDTH,
  borderRadius: METRICS.BORDER_RADIUS,
  icon: {
    tiny: METRICS.ICONS.tiny,
    small: METRICS.ICONS.small,
    medium: METRICS.ICONS.medium,
    large: METRICS.ICONS.large,
    xl: METRICS.ICONS.xl,
    xxl: METRICS.ICONS.xxl,
    xxxl: METRICS.ICONS.xxxl,
  },
  button: {
    verticalSpacing: 10,
    horizontalSpacing: 16,
  },
  ratio: {
    square: METRICS.RATIO.square,
    standard: METRICS.RATIO.standard,
    wide: METRICS.RATIO.wide,
    wideVertical: METRICS.RATIO.wideVertical,
  },
  statusBarHeight: METRICS.STATUS_BAR_HEIGHT,
  fabSize: 56,
  fabRadius: 28,
}
