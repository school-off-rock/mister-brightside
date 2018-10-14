import { StyleSheet } from 'react-native'
import { METRICS, COLORS } from '../../../../constants/theme'

const {
  SCREEN,
} = COLORS

const {
  STATUS_BAR_HEIGHT,
} = METRICS

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: SCREEN
  },
})
