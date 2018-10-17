import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { NavBarLarge } from '../../shared/components/NavBarLarge'

class SignInScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      header: <NavBarLarge navigation={navigation} title="Bem vindo" />
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

  navigateSignUpPhotoScreen = (registration) => {
    const { navigation, verifyEmployee } = this.props
    verifyEmployee(registration, navigation)
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
