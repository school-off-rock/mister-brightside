import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, shape } from 'prop-types'

import { registerEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'
import { SignIn } from '../components/SignUp'
import { generateStandardNavBar } from '../../../config/functions'

class SignInScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => generateStandardNavBar(navigation)

  static propTypes = {
    registerEmployee: func.isRequired,
    navigation: shape({ navigate: func })
  }

  static defaultProps = {
    navigation: { navigate: () => {} }
  }

  state = {}

  navigateToHistory = () => {
    const { navigation } = this.props
    navigation.navigate('history')
  }

  takePicture = async () => {
    if (this.camera) {
      const { registerEmployee } = this.props
      const options = { quality: 0.5, base64: true, forceUpOrientation: true }
      const data = await this.camera.takePictureAsync(options)
      registerEmployee('', data.base64)
    }
  };

  render() {
    const { registerEmployee } = this.props
    return (
      <SignIn
        registerEmployee={registerEmployee}
        onHistoryPress={this.navigateToHistory}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state)
})

const mapDispatchToProps = {
  registerEmployee: (registration, image) => registerEmployeeAction(registration, image)
}

export const SignInScreen = connect(mapStateToProps, mapDispatchToProps)(SignInScreenContainer)
