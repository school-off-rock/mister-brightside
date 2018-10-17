import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'

import { METRICS } from '../../../constants/theme'
import { styles } from './styles/formErrorMessage.style'

export class FormErrorMessage extends PureComponent {
  state = {
    messageOpacity: new Animated.Value(0),
    message: ''
  }

  componentDidUpdate = (prevProps) => {
    const { isVisible, message } = this.props
    if (isVisible !== prevProps.isVisible) {
      if (isVisible) {
        this.showMessage(message)
      } else {
        this.hideMessage(message)
      }
    }
  };

  showMessage = async (message) => {
    await this.setState({ message })
    Animated.timing(
      this.state.messageOpacity,
      {
        toValue: 1,
        duration: 275,
      }
    ).start()
  }

  hideMessage = () => (
    Animated.timing(
      this.state.messageOpacity,
      {
        toValue: 0,
        duration: 275,
      }
    ).start(() => this.setState({ message: '' }))
  )

  render() {
    const { messageOpacity, message } = this.state
    return (
      <Animated.Text
        style={[
          styles.errorMessage,
          {
            opacity: messageOpacity,
            transform: [{
              translateY: messageOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-METRICS.NANO, 0]
              })
            }],
            paddingVertical: messageOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, METRICS.NANO]
            }),
          }
        ]}
      >
        {message}
      </Animated.Text>
    )
  }
}

FormErrorMessage.propTypes = {
  message: PropTypes.string,
  isVisible: PropTypes.bool,
}

FormErrorMessage.defaultProps = {
  message: '',
  isVisible: false
}
