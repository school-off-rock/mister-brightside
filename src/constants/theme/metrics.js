import { Platform } from 'react-native'

const SNAP_BUTTON = 64

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 0 : 24
// const navBarDataHeight = Platform.OS === 'ios' ? 44 : 56
// const navBarHeight = statusBarHeight + navBarDataHeight

export const METRICS = {
  NANO: 4,
  MILLI: 6,
  BIT: 8,
  BYTE: 12,
  KILO: 16,
  MEGA: 24,
  GIGA: 32,
  TERA: 40,

  SNAP_BUTTON,
  SNAP_RADIUS: SNAP_BUTTON / 2,
  STATUS_BAR_HEIGHT
}
