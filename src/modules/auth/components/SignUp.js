import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'

import { func, bool } from 'prop-types'

import { ButtonWithRightIcon } from '../../shared/components/buttons/ButtonWithRightIcon'
import { FormErrorMessage } from '../../shared/components/FormErrorMessage'
import { InputWithLabel } from '../../shared/components/inputs/InputWithLabel'
import { RowLoading } from '../../shared/components/rows/RowLoading'
import { ScreenContainerHOC } from '../../shared/components/hoc/ScreenContainerHOC'
import { StatusBarStandard } from '../../shared/components/StatusBarStandard'
import { ViewHandlingKeyboard } from '../../shared/components/ViewHandlingKeyboard'

import { hasText, openPhonePad } from '../../../config/functions'
import { METRICS } from '../../../constants/theme'

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
  const containerStyle = [
    styles.container,
    {
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
        <FormErrorMessage
          message={alert.message}
          isVisible={alert.showAlert}
        />
      </View>
      {this.renderFooter()}
      {/* <ModalWithIcon
        onCancel={() => {}}
        onClose={() => {}}
        onAction={this.openNumber}
        isVisible={false}
        iconName="phone-in-talk"
        title="Precisa de ajuda?"
        description="Ligue para 4003-5159 que iremos te ajudar"
        closeButtonLabel="Fechar"
        actionButtonLabel="Ligar"
      /> */}
    </Container>
  )
}
}
