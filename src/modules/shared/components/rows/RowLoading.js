import React from 'react'
import { StyleSheet, View } from 'react-native'
import { bool } from 'prop-types'

import { LoadingSpinner } from '../LoadingSpinner'

import { rowStyles } from './style/row.style'
import { COLORS } from '../../../../constants/theme'
import { viewPropTypes } from '../../propTypes'

export const RowLoading = ({ isActive, style }) => (
  <View style={StyleSheet.flatten([rowStyles.loadingContainer, style])}>
    {
      isActive
      && <LoadingSpinner spinnerColor={COLORS.PRIMARY} spinnerSize="small" />
    }
  </View>
)

RowLoading.propTypes = {
  isActive: bool,
  style: viewPropTypes,
}
RowLoading.defaultProps = {
  isActive: true,
  style: {},
}
