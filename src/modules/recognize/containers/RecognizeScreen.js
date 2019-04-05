import React, { Component } from 'react'
import { connect } from 'react-redux'

import { userLoginAction } from '../../../redux/actions/async/asyncAuthActions'
import {
  setModalAction,
  setOnDismissModal,
} from '../../../redux/actions/sync/syncModalAction'

import { Recognize } from '../components/Recognize'

class RecognizeContainer extends Component {
  static navigationOptions = {
    header: null,
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  confirmUser = async userLabel => {
    const { userLogin } = this.props
    await userLogin(userLabel)
    this.goBack()
  }

  render() {
    const { setModal, isRecognizing, setOnDismissModal } = this.props
    return (
      <Recognize
        onBackPress={this.goBack}
        // onRecognizeUser={recognizeUser}
        setModal={setModal}
        isRecognizing={isRecognizing}
        setModalCallback={setOnDismissModal}
        onConfirmUser={this.confirmUser}
      />
    )
  }
}

const mapStateToProps = state => ({
  // isRecognizing: getSubmittingUser(state),
})

const mapDispatchToProps = {
  setModal: modal => setModalAction(modal),
  setOnDismissModal: onDismiss => setOnDismissModal(onDismiss),
  userLogin: label => userLoginAction(label),
}

export const RecognizeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecognizeContainer)
