import React, { Component } from 'react'
import {
  Animated,
  Easing,
  Platform,
  ProgressViewIOS,
  ProgressBarAndroid,
  InteractionManager,
} from 'react-native'

import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'

import { COLORS } from '../../../../constants/theme'

const AnimatedProgressBar = Animated.createAnimatedComponent(Platform.OS === 'ios' ? ProgressViewIOS : ProgressBarAndroid)

class RowProgressCountdownComponent extends Component {
  static propTypes = {
    countdownValue: PropTypes.number,
    onTimerEnd: PropTypes.func,
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    countdownValue: 5,
    onTimerEnd: () => {}
  }

  state = {
    progress: new Animated.Value(1),
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const { progress } = this.state
    const blurType = Platform.OS === 'ios' ? 'willBlur' : 'didBlur'
    this.blurSubscription = navigation.addListener(
      blurType,
      () => {
        Animated.timing(progress).stop()
        progress.setValue(1)
      }
    )
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(
        progress,
        {
          toValue: 0,
          duration: this.props.countdownValue * 1000,
          easing: Easing.linear
        }
      ).start(({ finished }) => finished && this.props.onTimerEnd())
    })
  }

  componentWillUnmount = () => this.blurSubscription.remove()

  render() {
    return (Platform.select({
      ios: () => (
        <AnimatedProgressBar
          progress={this.state.progress}
          progressViewStyle="bar"
          trackTintColor={COLORS.PRIMARY_OPACITY}
          progressTintColor={COLORS.PRIMARY}
        />
      ),
      android: () => (
        <AnimatedProgressBar
          color={COLORS.PRIMARY}
          indeterminate={false}
          progress={this.state.progress}
          style={{ height: 4 }}
          styleAttr="Horizontal"
        />
      ),
    })())
  }
}

export const RowProgressCountdown = withNavigation(RowProgressCountdownComponent)
