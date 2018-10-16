import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { bool } from 'prop-types'

import { COLORS } from '../../../../constants/theme'

export class Flash extends Component {
  static propTypes = {
    willFlash: bool.isRequired
  }

  state = { opacity: new Animated.Value(0) }

  componentDidUpdate = () => {
    const { willFlash } = this.props
    if (willFlash) {
      this.flash()
    }
  }

  flash = () => {
    const { opacity } = this.state
    opacity.setValue(1)
    Animated.timing(opacity, { toValue: 0, useNativeDriver: true }).start()
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
