import React, { Component } from 'react'
import {
  View,
  Platform,
  Keyboard,
  Text
} from 'react-native'
import { ScreenContainerHOC } from '../../shared/components/hoc/ScreenContainerHOC'
import { StatusBarStandard } from '../../shared/components/StatusBarStandard'
import { InputWithLabel } from '../../shared/components/inputs/InputWithLabel'
import { ButtonWithRightIcon } from '../../shared/components/buttons/ButtonWithRightIcon'
import { styles } from '../../shared/components/styles/shared.style'
import { METRICS, FONTS } from '../../../constants/theme'
import { hasText } from '../../../config/functions'


const Container = ScreenContainerHOC(View)

export class SignIn extends Component {
  static propTypes = {}

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

  render() {
    const { keyboardHeight, registration } = this.state
    const buttonDisabled = !hasText(registration)
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
          <Text style={{ textAlign: 'center', fontSize: FONTS.size.medium, alignSelf: 'center' }}>
          Para possibilitar o acesso aos seus dados, precisamos da sua matrícula
          </Text>
          <InputWithLabel
            onChangeText={this.setRegistration}
            label="Matrícula"
          />
        </View>
        <ButtonWithRightIcon
          disabled={buttonDisabled}
          title="CADASTRAR"
          onChangeText={this.setRegistration}
          label="Matrícula"
          iconName="chevron-right"
          onPress={() => alert('oi')}
          containerStyle={{ justifyContent: 'flex-end', padding: METRICS.BYTE }}
        />
      </Container>
    )
  }
}
