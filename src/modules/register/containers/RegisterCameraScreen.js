import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RegisterCamera } from '../components/RegisterCamera'

class RegisterCameraContainer extends Component {
  static navigationOptions = {
    header: null,
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render() {
    return <RegisterCamera onBackPress={this.goBack} />
  }
}

export const RegisterCameraScreen = connect()(RegisterCameraContainer)
