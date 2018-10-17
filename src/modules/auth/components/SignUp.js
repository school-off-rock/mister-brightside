import React, { Component } from 'react'
import {
  View,
  Platform,
  Keyboard,
  Text
} from 'react-native'

import { func, bool } from 'prop-types'

import { ButtonWithRightIcon } from '../../shared/components/buttons/ButtonWithRightIcon'
import { InputWithLabel } from '../../shared/components/inputs/InputWithLabel'
import { RowLoading } from '../../shared/components/rows/RowLoading'
import { ScreenContainerHOC } from '../../shared/components/hoc/ScreenContainerHOC'
import { StatusBarStandard } from '../../shared/components/StatusBarStandard'

import { METRICS } from '../../../constants/theme'
import { hasText } from '../../../config/functions'

import { styles } from '../styles/signUp.style'

const Container = ScreenContainerHOC(View)

export class SignUp extends Component {
  static propTypes = { onContinuePress: func.isRequired, loading: bool.isRequired }

  state = {
    keyboardHeight: 0,
  }

  componentDidMount = () => {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListener.remove()
      this.keyboardWillHideListener.remove()
    }
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
    }
  }

  keyboardWillShow = (event) => {
    if (Platform.OS === 'ios') { this.setKeyboard(event) }
  }

  keyboardDidShow = (event) => {
    if (Platform.OS === 'android') { this.setKeyboard(event) }
  }

  setKeyboard = (event) => {
    const keyboardHeight = event.endCoordinates.height
    this.setState({
      keyboardHeight: Platform.OS === 'ios' ? keyboardHeight : 0,
    })
  }

  keyboardWillHide = () => {
    if (Platform.OS === 'ios') { this.unsetKeyboard() }
  }

  keyboardDidHide = () => {
    if (Platform.OS === 'android') { this.unsetKeyboard() }
  }

  unsetKeyboard = () => {
    this.setState({
      keyboardHeight: 0,
    })
  }

  setRegistration = (registration) => {
    this.setState({ registration })
  }

  onSignUpPress = () => {
    const { onContinuePress } = this.props
    const { registration } = this.state
    onContinuePress(registration)
  }

  renderFooter = () => {
    const { loading } = this.props
    const { registration } = this.state
    const buttonDisabled = !hasText(registration)
    if (loading) {
      return (<RowLoading />)
    }
    return (
      <ButtonWithRightIcon
        disabled={buttonDisabled}
        title="CONTINUAR"
        onChangeText={this.setRegistration}
        label="Matrícula"
        iconName="chevron-right"
        onPress={this.onSignUpPress}
        containerStyle={styles.button}
      />
    )
  }

  render() {
    const { keyboardHeight } = this.state
    const containerStyle = [
      styles.container,
      {
        paddingBottom: keyboardHeight,
        paddingTop: METRICS.KILO,
        paddingHorizontal: METRICS.KILO,
      }
    ]
    return (
      <Container style={styles.container}>
        <StatusBarStandard />
        <View style={containerStyle}>
          <Text style={styles.description}>
          Para possibilitar o acesso aos seus dados, precisamos da sua matrícula
          </Text>
          <InputWithLabel
            onChangeText={this.setRegistration}
            label="Matrícula"
          />
        </View>
        {this.renderFooter()}
      </Container>
    )
  }
}
