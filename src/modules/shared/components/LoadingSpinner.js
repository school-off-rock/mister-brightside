import React from 'react'
import { ActivityIndicator } from 'react-native'
import { string } from 'prop-types'
import { COLORS } from '../../../constants/theme'


export const LoadingSpinner = (props) => {
  const { spinnerColor, spinnerSize } = props
  return (
    <ActivityIndicator color={spinnerColor || COLORS.PRIMARY} size={spinnerSize} />
  )
}

LoadingSpinner.propTypes = {
  spinnerColor: string,
  spinnerSize: string
}

LoadingSpinner.defaultProps = {
  spinnerColor: null,
  spinnerSize: 'large'
}
