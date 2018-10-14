import { StyleSheet } from 'react-native'
import { METRICS } from '../../../../../constants/theme/metrics'

export const rowStyles = StyleSheet.create({
  fill: {
    flex: 1
  },

  loadingContainer: {
    minHeight: METRICS.LOADING_CONTAINER_HEIGHT,
    justifyContent: 'center',
    paddingVertical: METRICS.BIT,
  },
})
