import React, { Component } from 'react'
import { View } from 'react-native'

import { func, bool } from 'prop-types'

import { ButtonWithRightIcon } from '../../shared/components/buttons/ButtonWithRightIcon'
import { FormErrorMessage } from '../../shared/components/FormErrorMessage'
import { InputWithLabel } from '../../shared/components/inputs/InputWithLabel'
import { RowLoading } from '../../shared/components/rows/RowLoading'
import { ScreenContainerHOC } from '../../shared/components/hoc/ScreenContainerHOC'
import { ViewHandlingKeyboard } from '../../shared/components/ViewHandlingKeyboard'
import { Paragraph } from '../../shared/components/text'

import { hasText, openPhonePad } from '../../../config/functions'

import { styles } from '../styles/signUp.style'

const Container = ScreenContainerHOC(ViewHandlingKeyboard)

export class SignUp extends Component {
  static propTypes = { onContinuePress: func.isRequired, loading: bool.isRequired, hideAlert: func.isRequired }

  state = {
    alert: { message: '', showAlert: false }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.alert.showAlert !== prevState.alert.showAlert) {
      return {
        alert: nextProps.alert
      }
    }
    return null
  }

  setAlert = (showAlert, message) => { this.setState({ alert: { showAlert, message } }) }

  setRegistration = (registration) => {
    const { alert } = this.state
    const { showAlert } = alert
    const { hideAlert } = this.props
    if (showAlert === true) {
      hideAlert()
      this.setState({ alert: { showAlert: false, message: '', registration } })
    } else {
      this.setState({ registration })
    }
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

openNumber = () => openPhonePad('40035159')

render() {
  const { alert } = this.state
  return (
    <Container style={styles.container}>
      <View style={styles.fluid}>
        <Paragraph style={styles.description}>
          Para possibilitar o acesso aos seus dados, precisamos da sua matrícula
        </Paragraph>
        <InputWithLabel
          style={styles.input}
          onChangeText={this.setRegistration}
          label="Matrícula"
        />
        <FormErrorMessage
          message={alert.message}
          isVisible={alert.showAlert}
        />
      </View>
      {this.renderFooter()}
    </Container>
  )
}
}
