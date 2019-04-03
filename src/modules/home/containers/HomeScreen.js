import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InteractionManager, Alert } from 'react-native'
import { func, shape, bool, oneOf } from 'prop-types'

import {
  verifyEmployeePhotoAction,
  trainEmployeePhotoAction,
  clearUserAction,
  checkEmployeeOnImageAction,
  verifyIpAddressAction,
} from '../../../redux/actions/async/asyncAuthActions'
import {
  registerEmployeeEntryAction,
  checkEmployeeEntryTimeAction,
} from '../../../redux/actions/async/asyncClockEntryActions'
import {
  showLoading,
  setFaceDetectionEnabled,
  setFaceDetectionDisabled,
} from '../../../redux/actions/sync/syncAuthActions'
import {
  getLoading,
  getUser,
  getIpStatus,
  getNetworkType,
  getFaceDetection,
} from '../../../redux/reducers/auth/selectors'
import { getLoadingClockIn } from '../../../redux/reducers/clockEntry/selectors'
import { getModalState } from '../../../redux/reducers/modal/selectors'
import {
  setOnDismissModal,
  setModalAction,
} from '../../../redux/actions/sync/syncModalAction'

import { Home } from '../components/Home'
import { NavBar } from '../../shared/containers/NavBar'

import { hasText, toSentenceCase } from '../../../config/functions'

class HomeScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const userName = navigation.getParam('userName', '')
    const firstName = hasText(userName) ? toSentenceCase(userName) : ''
    const title = hasText(userName) ? `Olá, ${firstName}` : 'Tirar foto'
    return { header: <NavBar navigation={navigation} title={title} /> }
  }

  static propTypes = {
    checkEmployeeOnImage: func.isRequired,
    clearUser: func.isRequired,
    hasFaceDetection: bool,
    ipStatus: oneOf(['NOT_SET', 'VALID', 'INVALID']),
    isLoading: bool,
    isLoadingClockIn: bool,
    isSignUp: bool,
    navigation: shape({ navigate: func }),
    registerEmployeeEntry: func.isRequired,
    setFaceDetectionDisabled: func.isRequired,
    setFaceDetectionEnabled: func.isRequired,
    showLoading: func.isRequired,
    trainEmployeePhoto: func.isRequired,
    verifyEmployeePhoto: func.isRequired,
    verifyIpAddress: func.isRequired,
    setOnDismissModal: func.isRequired,
    modalAlert: shape({ isVisible: bool }),
  }

  static defaultProps = {
    ipStatus: 'NOT_SET',
    hasFaceDetection: false,
    isLoading: false,
    isLoadingClockIn: false,
    isSignUp: false,
    navigation: { navigate: () => {} },
    modalAlert: { isVisible: false },
  }

  componentDidMount = () => {
    const { clearUser, verifyIpAddress } = this.props
    InteractionManager.runAfterInteractions(async () => {
      clearUser()
      verifyIpAddress()
    })
  }

  navigateToHistory = () => {
    const { navigation } = this.props
    navigation.navigate('history')
  }

  onRegisterEmployee = async image => {
    const { checkEmployeeOnImage, navigation } = this.props
    await checkEmployeeOnImage(image, navigation)
  }

  clearUser = () => {
    const { navigation, clearUser, modalAlert, setOnDismissModal } = this.props
    navigation.setParams({
      userName: undefined,
    })
    clearUser()
    if (modalAlert.isVisible) {
      return setOnDismissModal(this.showReadyModal)
    }
    return this.showReadyModal()
  }

  showReadyModal = () => {
    const { setFaceDetectionEnabled } = this.props
    Alert.alert('Tudo preparado', 'Está pronto para começar?', [
      {
        text: 'Estou pronto',
        onPress: setFaceDetectionEnabled,
      },
    ])
  }

  onCleanPreview = () => {
    const { modalAlert, setOnDismissModal } = this.props
    if (modalAlert.isVisible) {
      return setOnDismissModal(this.showReadyModal)
    }
  }

  render() {
    const {
      isLoading,
      isLoadingClockIn,
      isSignUp,
      trainEmployeePhoto,
      verifyEmployeePhoto,
      showLoading,
      ipStatus,
      setFaceDetectionDisabled,
      hasFaceDetection,
      setFaceDetectionEnabled,
      checkEmployeeEntryTime,
      registerEmployeeEntry,
      setModal,
    } = this.props
    const isLoadingPhoto = isLoading || isLoadingClockIn
    return (
      <Home
        onCleanPreview={this.onCleanPreview}
        isLoading={isLoadingPhoto}
        isSignUp={isSignUp}
        onHistoryPress={this.navigateToHistory}
        onRegisterEmployee={this.onRegisterEmployee}
        checkEmployeeEntryTime={checkEmployeeEntryTime}
        onRegisterEmployeeEntryPress={registerEmployeeEntry}
        onTrainEmployeePhotoPress={trainEmployeePhoto}
        verifyEmployeePhoto={verifyEmployeePhoto}
        onTakePicture={showLoading}
        clearUser={this.clearUser}
        ipStatus={ipStatus}
        onEnableFaceDetection={setFaceDetectionEnabled}
        onDisableFaceDetection={setFaceDetectionDisabled}
        hasFaceDetection={hasFaceDetection}
        setModal={setModal}
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  isLoading: getLoading(state),
  isLoadingClockIn: getLoadingClockIn(state),
  isSignUp: props.navigation.getParam('signUp', false),
  modalAlert: getModalState(state),
  user: getUser(state),
  ipStatus: getIpStatus(state),
  networkType: getNetworkType(state),
  hasFaceDetection: getFaceDetection(state),
})

const mapDispatchToProps = {
  verifyEmployeePhoto: image => verifyEmployeePhotoAction(image),
  checkEmployeeOnImage: (image, navigation) =>
    checkEmployeeOnImageAction(image, navigation),
  registerEmployeeEntry: () => registerEmployeeEntryAction(),
  trainEmployeePhoto: image => trainEmployeePhotoAction(image),
  clearUser: () => clearUserAction(),
  verifyIpAddress: () => verifyIpAddressAction(),
  showLoading,
  setFaceDetectionEnabled,
  setFaceDetectionDisabled,
  setOnDismissModal: onDismiss => setOnDismissModal(onDismiss),
  checkEmployeeEntryTime: () => checkEmployeeEntryTimeAction(),
  setModal: modal => setModalAction(modal),
}

export const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenContainer)
