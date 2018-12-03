import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { styles } from '../styles/styles.home'
import { ViewBlurIOS } from '../../shared/components/ViewBlurIOS'

export class FaceDetectionShelter extends Component {
  static propTypes = {
    isSmiling: PropTypes.bool,
    isLeftEyeOpen: PropTypes.bool,
    isRightEyeOpen: PropTypes.bool,
    onLiveness: PropTypes.func.isRequired
  }

  static defaultProps = {
    isSmiling: undefined,
    isLeftEyeOpen: undefined,
    isRightEyeOpen: undefined
  }

  state = {
    hasLiveness: false,
    hasBeenSerious: false,
    hasBeenSmiling: false,
    hasLeftEyeBeenClosed: false,
    hasLeftEyeBeenOpen: false,
    hasRightEyeBeenClosed: false,
    hasRightEyeBeenOpen: false
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { isSmiling, isLeftEyeOpen, isRightEyeOpen } = this.props
    if (isSmiling !== nextProps.isSmiling) return true
    if (isLeftEyeOpen !== nextProps.isLeftEyeOpen) return true
    if (isRightEyeOpen !== nextProps.isRightEyeOpen) return true

    const {
      hasBeenSerious, hasBeenSmiling, hasLiveness, hasLeftEyeBeenClosed, hasLeftEyeBeenOpen, hasRightEyeBeenClosed, hasRightEyeBeenOpen
    } = this.state
    if (hasBeenSerious !== nextState.hasBeenSerious) return true
    if (hasBeenSmiling !== nextState.hasBeenSmiling) return true
    if (hasLeftEyeBeenClosed !== nextState.hasLeftEyeBeenClosed) return true
    if (hasLeftEyeBeenOpen !== nextState.hasLeftEyeBeenOpen) return true
    if (hasRightEyeBeenClosed !== nextState.hasRightEyeBeenClosed) return true
    if (hasRightEyeBeenOpen !== nextState.hasRightEyeBeenOpen) return true
    if (hasLiveness !== nextState.hasLiveness) return true

    return false
  }

  componentDidUpdate = () => {
    const { isSmiling, isLeftEyeOpen, isRightEyeOpen } = this.props

    if ('isSmiling' in this.props && isSmiling !== undefined) {
      if (isSmiling) {
        this.setState({ hasBeenSmiling: true })
      } else {
        this.setState({ hasBeenSerious: true })
      }
    }

    if ('isLeftEyeOpen' in this.props && isLeftEyeOpen !== undefined) {
      if (isLeftEyeOpen) {
        this.setState({ hasLeftEyeBeenOpen: true })
      } else {
        this.setState({ hasLeftEyeBeenClosed: true })
      }
    }

    if ('isRightEyeOpen' in this.props && isRightEyeOpen !== undefined) {
      if (isRightEyeOpen) {
        this.setState({ hasRightEyeBeenOpen: true })
      } else {
        this.setState({ hasRightEyeBeenClosed: true })
      }
    }

    if (!this.state.hasLiveness) {
      this.checkLiveness()
    }
  }

  checkLiveness = () => {
    const {
      hasBeenSmiling, hasBeenSerious, hasLeftEyeBeenOpen, hasLeftEyeBeenClosed, hasRightEyeBeenOpen, hasRightEyeBeenClosed
    } = this.state
    if (hasBeenSmiling && hasBeenSerious) {
      this.setState({ hasLiveness: true })
      return this.onLiveness('SORRISO')
    }
    if ((hasLeftEyeBeenOpen && hasLeftEyeBeenClosed) || (hasRightEyeBeenOpen && hasRightEyeBeenClosed)) {
      this.setState({ hasLiveness: true })
      return this.onLiveness('PISCAR')
    }
    return null
  }

  onLiveness = () => this.props.onLiveness()

  render() {
    return (
      <ViewBlurIOS style={styles.overlay}>
        <Text style={styles.faceRecognitionText}>Reconhecimento facial ativo</Text>
        <Text style={styles.faceRecognitionSubtitle}>Tente piscar ou sorrir para tirar a foto</Text>
      </ViewBlurIOS>
    )
  }
}
