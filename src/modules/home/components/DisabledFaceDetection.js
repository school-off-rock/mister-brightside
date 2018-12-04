import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { ViewBlurIOS } from '../../shared/components/ViewBlurIOS'

import { styles } from '../styles/styles.home'

export const DisabledFaceDetection = ({ isLoading }) => {
  const [title, titleStyle, subtitle] = isLoading
    ? ['Reconhecimento facial', styles.faceRecognitionText, 'Processando...']
    : ['Reconhecimento facial desativado', styles.faceRecognitionDisabledText, 'Não é possível te identificar neste momento']
  return (
    <ViewBlurIOS style={styles.overlay}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={styles.faceRecognitionDisabledSubtitle}>{subtitle}</Text>
    </ViewBlurIOS>
  )
}

DisabledFaceDetection.propTypes = {
  isLoading: PropTypes.bool
}
DisabledFaceDetection.defaultProps = {
  isLoading: false
}
