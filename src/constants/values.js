import React from 'react'
import { Platform, View } from 'react-native'
import Config from 'react-native-config'
import { COLORS, METRICS } from './theme'

const {
  BASE_URL,
  KAIROS_BASE_URL,
  KAIROS_API_ID,
  KAIROS_API_KEY,
  KAIROS_SCHOOL_GALLERY_NAME,
  IP_ADDRESS_API
} = Config

const NAV_BAR_STYLES = {
  primary: {
    headerTintColor: COLORS.NAV_BAR.tint,
    headerTitleStyle: { color: COLORS.BLACK_PRIMARY_ALT },
    headerPressColorAndroid: COLORS.PRIMARY,
    headerBackground: <View style={{ flex: 1, backgroundColor: COLORS.NAV_BAR.background }} />,
    headerStyle: {
      ...Platform.select({
        android: {
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          height: METRICS.NAV_BAR_HEIGHT
        }
      })
    },
  },
  primaryWithTab: {
    headerTintColor: COLORS.NAV_BAR.tint,
    headerTitleStyle: { color: COLORS.BLACK_PRIMARY_ALT },
    headerPressColorAndroid: COLORS.PRIMARY,
    headerBackground: <View style={{ flex: 1, backgroundColor: COLORS.NAV_BAR.background }} />,
    headerStyle: {
      ...Platform.select({
        android: {
          height: METRICS.NAV_BAR_HEIGHT,
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          elevation: 0,
        },
        ios: {
          borderBottomWidth: 0,
        }
      })
    },
  },
  dark: {
    headerTintColor: COLORS.WHITE,
    headerTitleStyle: { color: COLORS.WHITE },
    headerPressColorAndroid: COLORS.PRIMARY,
    headerBackground: <View style={{ flex: 1, backgroundColor: COLORS.PURE_BLACK }} />,
    headerStyle: {
      ...Platform.select({
        android: {
          height: METRICS.NAV_BAR_HEIGHT,
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          elevation: 0,
        },
        ios: {
          borderBottomWidth: 0,
        }
      })
    },
  },
}

export const Values = {
  API_URL: BASE_URL,
  KAIROS_API_URL: KAIROS_BASE_URL,
  KAIROS_API_ID,
  KAIROS_API_KEY,
  KAIROS_SCHOOL_GALLERY_NAME,
  IP_ADDRESS_API,
  NAV_BAR_STYLES
}
