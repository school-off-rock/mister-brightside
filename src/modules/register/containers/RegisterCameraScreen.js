import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RegisterCamera } from '../components/RegisterCamera'
import { setModalAction } from '../../../redux/actions/sync/syncModalAction'
import { getSubmittingUser } from '../../../redux/reducers/auth/selectors'
import { submitNewUserAction } from '../../../redux/actions/async/asyncAuthActions'

class RegisterCameraContainer extends Component {
  static navigationOptions = {
    header: null,
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  submitNewUser = async (userId, userImage) => {
    const { submitNewUser } = this.props
    await submitNewUser(userId, userImage)
    this.goBack()
  }

  render() {
    const { setModal, isSubmitting } = this.props
    return (
      <RegisterCamera
        onBackPress={this.goBack}
        onSubmitUser={this.submitNewUser}
        setModal={setModal}
        isSubmitting={isSubmitting}
      />
    )
  }
}

const mapStateToProps = state => ({
  isSubmitting: getSubmittingUser(state),
})

const mapDispatchToProps = {
  setModal: modal => setModalAction(modal),
  submitNewUser: (id, image) => submitNewUserAction(id, image),
}

export const RegisterCameraScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterCameraContainer)
