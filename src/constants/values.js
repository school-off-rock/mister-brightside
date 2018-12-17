import React from "react"
import { Platform, View } from "react-native"
import Config from "react-native-config"
import { COLORS, METRICS } from "./theme"

const {
  BASE_URL,
  FRAPI_BASE_URL,
  FRAPI_API_ID,
  FRAPI_KEY,
  FRAPI_SCHOOL_GALLERY_NAME,
  IP_ADDRESS_API
} = Config

const HELP_PHONE = {
  STRING: "4003-5159",
  NUMBER: 40035159
}

export const livenessThreshold = {
  OPEN_EYE: Platform.OS === "ios" ? 0.3 : 0.35,
  SMILING: Platform.OS === "ios" ? 0.6 : 0.4
}

const NAV_BAR_STYLES = {
  absolute: {
    headerTransparent: true,
    headerStyle: {
      backgroundColor: COLORS.LIGHT_OVERLAY,
      ...Platform.select({
        android: {
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          height: METRICS.NAV_BAR_HEIGHT
        }
      })
    }
  },
  twoLines: {
    headerTransparent: true,
    headerStyle: {
      backgroundColor: COLORS.LIGHT_OVERLAY,
      ...Platform.select({
        android: {
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          height: METRICS.NAV_BAR_HEIGHT_LARGE
        }
      })
    }
  },
  primary: {
    headerTintColor: COLORS.NAV_BAR.tint,
    headerTitleStyle: { color: COLORS.BLACK_PRIMARY_ALT },
    headerPressColorAndroid: COLORS.PRIMARY,
    headerBackground: (
      <View style={{ flex: 1, backgroundColor: COLORS.NAV_BAR.background }} />
    ),
    headerStyle: {
      ...Platform.select({
        android: {
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          height: METRICS.NAV_BAR_HEIGHT
        }
      })
    }
  },
  primaryWithTab: {
    headerTintColor: COLORS.NAV_BAR.tint,
    headerTitleStyle: { color: COLORS.BLACK_PRIMARY_ALT },
    headerPressColorAndroid: COLORS.PRIMARY,
    headerBackground: (
      <View style={{ flex: 1, backgroundColor: COLORS.NAV_BAR.background }} />
    ),
    headerStyle: {
      ...Platform.select({
        android: {
          height: METRICS.NAV_BAR_HEIGHT,
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          elevation: 0
        },
        ios: {
          borderBottomWidth: 0
        }
      })
    }
  },
  dark: {
    headerTintColor: COLORS.WHITE,
    headerTitleStyle: { color: COLORS.WHITE },
    headerPressColorAndroid: COLORS.PRIMARY,
    headerBackground: (
      <View style={{ flex: 1, backgroundColor: COLORS.PURE_BLACK }} />
    ),
    headerStyle: {
      ...Platform.select({
        android: {
          height: METRICS.NAV_BAR_HEIGHT,
          paddingTop: METRICS.STATUS_BAR_HEIGHT,
          elevation: 0
        },
        ios: {
          borderBottomWidth: 0
        }
      })
    }
  }
}

export const Values = {
  API_URL: BASE_URL,
  FRAPI_API_URL: FRAPI_BASE_URL,
  FRAPI_API_ID,
  FRAPI_API_KEY: FRAPI_KEY,
  FRAPI_SCHOOL_GALLERY_NAME,
  IP_ADDRESS_API,
  NAV_BAR_STYLES,
  HELP_PHONE
}
