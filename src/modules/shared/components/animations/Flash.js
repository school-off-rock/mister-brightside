import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { bool, func } from 'prop-types'

import { COLORS } from '../../../../constants/theme'

export class Flash extends Component {
  static propTypes = {
    willFlash: bool.isRequired,
    onFlashEnd: func,
  }

  static defaultProps = {
    onFlashEnd: () => {},
  }

  state = { opacity: new Animated.Value(0) }

  componentDidUpdate = (prevProps) => {
    const { willFlash } = this.props
    if (willFlash !== prevProps.willFlash && willFlash) {
      this.flash()
    }
  }

  flash = () => {
    const { opacity } = this.state
    opacity.setValue(1)
    Animated.timing(opacity, { toValue: 0, useNativeDriver: true }).start(this.props.onFlashEnd)
  }

  render() {
    const { opacity } = this.state
    return (
      <Animated.View
        pointerEvents="box-none"
        style={{
          opacity,
          backgroundColor: COLORS.WHITE,
          ...StyleSheet.absoluteFillObject
        }}
      />
    )
  }
}
