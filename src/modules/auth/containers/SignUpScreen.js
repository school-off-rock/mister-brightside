import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import {
  func,
  shape,
  string,
  bool
} from 'prop-types'
import { verifyEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { hideAlert } from '../../../redux/actions/sync/syncAuthActions'
import { getLoading, getAlert } from '../../../redux/reducers/auth/selectors'

import { SignUp } from '../components/SignUp'
import { NavBar } from '../../shared/containers/NavBar'

class SignInScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      header: <NavBar navigation={navigation} title="Bem vindo" />
    })
  }

  static propTypes = {
    navigation: shape({ navigate: func }),
    verifyEmployee: func.isRequired,
    isLoading: bool,
    alert: shape({ message: string, showAlert: bool }),
    hideErrorAlert: func
  }

  static defaultProps = {
    navigation: { navigate: () => {} },
    isLoading: false,
    alert: { message: '', showAlert: false },
    hideErrorAlert: () => {}
  }

  state = {}

  navigateSignUpPhotoScreen = async (registration) => {
    const { navigation, verifyEmployee } = this.props
    try {
      const employee = await verifyEmployee(registration, navigation)
      Alert.alert('Tudo certo',
        'Na proxima tela, tire uma foto sua para finalizar o cadastro',
        [{ text: 'Tirar foto', onPress: () => navigation.navigate('home', { employee, signUp: true }) }],
        { cancelable: true })
    } catch (error) {}
  }

  render() {
    const { isLoading, alert, hideErrorAlert } = this.props
    return (
      <SignUp
        onContinuePress={this.navigateSignUpPhotoScreen}
        loading={isLoading}
        alert={alert}
        hideAlert={hideErrorAlert}
      />
    )
  }
}
const mapStateToProps = state => ({
  isLoading: getLoading(state),
  alert: getAlert(state),
})

const mapDispatchToProps = {
  verifyEmployee: (registration, navigation) => verifyEmployeeAction(registration, navigation),
  hideErrorAlert: () => hideAlert()
}

export const SignInScreen = connect(mapStateToProps, mapDispatchToProps)(SignInScreenContainer)
