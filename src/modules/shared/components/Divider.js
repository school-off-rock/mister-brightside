import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { COLORS, METRICS } from '../../../constants/theme'

export const Divider = (props) => {
  const {
    bottomInset,
    leftInset,
    noMargin,
    rightInset,
    topInset,
    vertical,
    width,
  } = props

  const dividerStyle = vertical
    ? {
      marginBottom: bottomInset,
      marginHorizontal: (noMargin) ? 0 : METRICS.BIT,
      marginTop: topInset,
      width: width || 1,
    } : {
      height: width || 1,
      marginLeft: leftInset,
      marginRight: rightInset,
      marginVertical: (noMargin) ? 0 : METRICS.BIT,
    }
  return (
    <View style={[dividerStyle, { backgroundColor: COLORS.DARK_DIVIDER }]} />
  )
}

Divider.propTypes = {
  leftInset: PropTypes.number,
  topInset: PropTypes.number,
  bottomInset: PropTypes.number,
  noMargin: PropTypes.bool,
  rightInset: PropTypes.number,
  vertical: PropTypes.bool,
  width: PropTypes.number,
}

Divider.defaultProps = {
  leftInset: 0,
  topInset: 0,
  bottomInset: 0,
  noMargin: false,
  rightInset: 0,
  vertical: false,
  width: 1
}
