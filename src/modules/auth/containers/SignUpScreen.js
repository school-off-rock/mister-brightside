import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, shape, bool } from 'prop-types'
import { SignUp } from '../components/SignUp'
import { verifyEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'
import { NavBarLarge } from '../../shared/components/NavBarLarge'

class SignInScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      header: <NavBarLarge navigation={navigation} />
    })
  }

  static propTypes = {
    navigation: shape({ navigate: func }),
    verifyEmployee: func.isRequired,
    isLoading: bool,
  }

  static defaultProps = {
    navigation: { navigate: () => {} },
    isLoading: false
  }

  state = {}

  navigateSignUpPhotoScreen = (registration) => {
    const { navigation, verifyEmployee } = this.props
    verifyEmployee(registration, navigation)
  }

  render() {
    const { isLoading } = this.props
    return (
      <SignUp
        onContinuePress={this.navigateSignUpPhotoScreen}
        loading={isLoading}
      />
    )
  }
}
const mapStateToProps = state => ({
  isLoading: getLoading(state)
})

const mapDispatchToProps = {
  verifyEmployee: (registration, navigation) => verifyEmployeeAction(registration, navigation)
}

export const SignInScreen = connect(mapStateToProps, mapDispatchToProps)(SignInScreenContainer)
