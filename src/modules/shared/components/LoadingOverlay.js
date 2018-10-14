import React from 'react'
import { View, StyleSheet } from 'react-native'
import { bool } from 'prop-types'

import { LoadingSpinner } from './LoadingSpinner'
import { styles } from './styles/loadingOverlay.style'
import { COLORS } from '../../../constants/theme'

export const LoadingOverlay = ({ elevated }) => {
  const elevation = (elevated) ? styles.overlayElevation : {}
  return (
    <View style={StyleSheet.flatten([styles.absoluteFill, elevation])}>
      <LoadingSpinner spinnerColor={COLORS.PRIMARY} />
    </View>
  )
}

LoadingOverlay.propTypes = {
  elevated: bool,
}

LoadingOverlay.defaultProps = {
  elevated: false
}
