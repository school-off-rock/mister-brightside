import { Platform } from 'react-native'
// import { COLORS } from './colors'
// import { METRICS } from './metrics'

const type = {
  light: {
    ...Platform.select({
      android: { fontFamily: 'sans-serif-light' },
      ios: { fontWeight: '300' },
    }),
  },
  regular: {
    ...Platform.select({
      android: { fontFamily: 'sans-serif' },
      ios: { fontWeight: '400' },
    }),
  },
  medium: {
    ...Platform.select({
      android: { fontFamily: 'sans-serif-medium' },
      ios: { fontWeight: '700' },
    }),
  },
}

const size = {
  h1: 42,
  h2: 36,
  h3: 28,
  h4: 22,
  h5: 20,
  h6: 19,
  input: (Platform.OS === 'ios') ? 17 : 15,
  regular: 17,
  button: (Platform.OS === 'ios') ? 17 : 14,
  secondaryButton: (Platform.OS === 'ios') ? 15 : 12,
  medium: 15,
  small: 13,
  tiny: 11
}

const lineHeight = {
  boost: 24,
  regular: 20,
  small: 16,
}

const style = {
  title: {
    ...type.medium,
    fontSize: size.medium
  },
  primaryButton: {
    ...type.medium,
    fontSize: size.medium
  },
  secondaryButton: {
    ...type.medium,
    fontSize: size.secondaryButton
  },
  footNote: {
    ...type.regular,
    fontSize: size.small
  },
}
export const FONTS = {
  lineHeight,
  size,
  style,
  type,
}
