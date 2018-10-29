import { Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

export const COLORS = {
  PRIMARY: '#ED323D',
  PRIMARY_OPACITY: 'rgba(237, 50, 61, 0.3)',
  ALERT: '#FF9F1C',
  SUCCESS: '#256EFF',
  POSITIVE: '#00973A',

  SCREEN: '#F3F5F7',
  SURFACE: '#FFFFFF',
  ON_SUCCESS: '#FFFFFF',
  SURFACE_OPACITY: 'rgba(255, 255, 255, 0.9)',
  LIGHT_OVERLAY: 'rgba(255, 255, 255, 0.4)',

  DARK: '#261C15',
  BLACK_SECONDARY_ALT: '#00000089',
  BLACK_SECONDARY: '#757575',
  BLACK_PRIMARY_ALT: '#000000DD',
  DARK_OVERLAY: 'rgba(0, 0, 0, 0.80)',

  PURE_BLACK: '#000',

  WHITE: '#ffffff',
  WHITE_SECONDARY: '#ffffffB2',
  WHITE_SECONDARY_ALT: '#e8e7e7',

  DARK_DIVIDER: 'rgba(0, 0, 0, 0.14)',

  ANDROID_STATUS_BAR: 'rgba(0, 0, 0, 0.12)',

  NAV_BAR: {
    background: isIOS
      ? '#f3f5f7'
      : '#F6F8FA',
    tint: isIOS
      ? '#00973A'
      : '#00000089',
    iosBorderColor: 'rgba(167, 167, 164, 0.25)',
  },
}
