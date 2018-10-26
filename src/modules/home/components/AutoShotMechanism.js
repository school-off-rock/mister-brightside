import React, { Component } from 'react'
import {
  Text, InteractionManager, Platform
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { func, object } from 'prop-types'
import { styles } from '../styles/styles.home'
import { ViewBlurIOS } from '../../shared/components/ViewBlurIOS'
import { RowProgressCountdown } from '../../shared/components/rows/RowProgressCountdown'

const COUNTDOWN = 2

class AutoShot extends Component {
  static propTypes = {
    onTimerEnd: func,
    navigation: object.isRequired
  }

  static defaultProps = {
    onTimerEnd: () => {}
  }

  state = {
    progressText: COUNTDOWN,
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const blurType = Platform.OS === 'ios' ? 'willBlur' : 'didBlur'
    this.blurSubscription = navigation.addListener(blurType, this.clearTimer)
    InteractionManager.runAfterInteractions(() => {
      this.startTimer()
    })
  }

  componentWillUnmount = () => {
    this.blurSubscription.remove()
    this.clearTimer()
  }

  startTimer = () => {
    this.timer = setInterval(
      () => this.setState(({ progressText }) => {
        if (progressText === 1) this.clearTimer()
        return { progressText: progressText - 1 }
      }), 1000
    )
  }

  clearTimer = () => clearInterval(this.timer)

  render() {
    const timeUnity = this.state.progressText === 1 ? ' segundo' : ' segundos'
    return (
      <ViewBlurIOS style={styles.overlay}>
        <RowProgressCountdown
          countdownValue={COUNTDOWN}
          onTimerEnd={this.props.onTimerEnd}
        />
        <Text style={styles.countdownText}>
          A foto será capturada em:
          <Text style={styles.countdownTextBold}>
            {` ${this.state.progressText}${timeUnity}`}
          </Text>
        </Text>
      </ViewBlurIOS>
    )
  }
}

export const AutoShotMechanism = withNavigation(AutoShot)
