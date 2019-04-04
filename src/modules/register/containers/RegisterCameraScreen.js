import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RegisterCamera } from '../components/RegisterCamera'
import { submitNewUser } from '../../../services/auth'
import { setModalAction } from '../../../redux/actions/sync/syncModalAction'

class RegisterCameraContainer extends Component {
  static navigationOptions = {
    header: null,
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  submitNewUser = async (userId, userImage) => {
    const newUser = await submitNewUser(userId, userImage)
    console.log(
      'TCL: RegisterCameraContainer -> submitNewUser -> newUser',
      newUser
    )
  }

  render() {
    const { setModal } = this.props
    return (
      <RegisterCamera
        onBackPress={this.goBack}
        onSubmitUser={this.submitNewUser}
        setModal={setModal}
      />
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setModal: modal => setModalAction(modal),
}

export const RegisterCameraScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterCameraContainer)
