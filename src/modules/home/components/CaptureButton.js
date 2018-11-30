import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import { LoadingSpinner } from '../../shared/components/LoadingSpinner'

import { styles } from '../styles/styles.home'

export const CaptureButton = ({ onPress, disabled, isLoading }) => (
  <View style={styles.bottomOverlay}>
    <View style={styles.captureWrap}>
      <TouchableOpacity style={styles.capture} onPress={onPress} disabled={disabled}>
        {isLoading && (
          <View style={styles.spinnerAbsoluteCentered}>
            <LoadingSpinner />
          </View>
        )}
      </TouchableOpacity>
    </View>
  </View>
)

CaptureButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool
}

CaptureButton.defaultProps = {
  onPress: () => {},
  disabled: false,
  isLoading: false
}
