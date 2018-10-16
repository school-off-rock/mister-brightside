import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'

import { METRICS } from '../../../constants/theme'
import { styles } from './styles/formErrorMessage.style'

export class FormErrorMessage extends PureComponent {
  state = {
    messageOpacity: new Animated.Value(0),
    isVisible: false,
  }

  componentWillReceiveProps = (nextProps) => {
    const { isVisible } = this.state
    if (isVisible !== nextProps.isVisible) {
      if (nextProps.isVisible) {
        this.showMessage()
      } else {
        this.hideMessage()
      }
      this.setState({ isVisible: nextProps.isVisible })
    }
  }

  showMessage = () => (
    Animated.timing(
      this.state.messageOpacity,
      {
        toValue: 1,
        duration: 275,
      }
    ).start()
  )

  hideMessage = () => (
    Animated.timing(
      this.state.messageOpacity,
      {
        toValue: 0,
        duration: 275,
      }
    ).start()
  )

  render() {
    const { message } = this.props
    const { messageOpacity } = this.state
    return (
      <Animated.Text
        style={[
          styles.errorMessage,
          {
            opacity: messageOpacity,
            maxHeight: messageOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, METRICS.MAX_ERROR_MESSAGE_HEIGHT]
            }),
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
