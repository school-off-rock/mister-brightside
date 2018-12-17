import React, { Component } from "react"
import { connect } from "react-redux"
import { InteractionManager, Alert, BackHandler } from "react-native"
import { func, shape, bool, oneOf } from "prop-types"

import {
  verifyEmployeePhotoAction,
  trainEmployeePhotoAction,
  clearUserAction,
  checkEmployeeOnImageAction,
  verifyIpAddressAction
} from "../../../redux/actions/async/asyncAuthActions"
import { registerEmployeeEntryAction } from "../../../redux/actions/async/asyncClockEntryActions"
import {
  showLoading,
  setFaceDetectionEnabled,
  setFaceDetectionDisabled
} from "../../../redux/actions/sync/syncAuthActions"
import {
  getLoading,
  getUser,
  getIpStatus,
  getNetworkType,
  getFaceDetection
} from "../../../redux/reducers/auth/selectors"
import { getLoadingClockIn } from "../../../redux/reducers/clockEntry/selectors"
import { getModalState } from "../../../redux/reducers/modal/selectors"
import { setOnDismissModal } from "../../../redux/actions/sync/syncModalAction"

import { Home } from "../components/Home"
import { NavBar } from "../../shared/containers/NavBar"

import { hasText } from "../../../config/functions"

class HomeScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const userName = navigation.getParam("userName", "")
    // const hasFaceDetection = navigation.getParam('hasFaceDetection', true)
    // const onToggleFaceDetect = navigation.getParam('onToggleFaceDetect', () => {})
    // const isDisabledOnLoading = navigation.getParam('isDisabledOnLoading', false)
    // const exitApp = navigation.getParam('exitApp', () => {})

    const firstName = hasText(userName)
      ? `${userName.charAt(0)}${userName
          .slice(1, userName.length)
          .toLowerCase()}`
      : ""
    // const welcomeText = hasText(firstName) ? `Olá, ${firstName}` : ''
    const title = hasText(userName) ? `Olá, ${firstName}` : "Tirar foto"
    // const rightButton = [
    //   {
    //     name: 'exit-to-app',
    //     onPress: exitApp,
    //     disabled: isDisabledOnLoading
    //   }
    // ]
    // const faceDetectionButton = hasFaceDetection
    //   ? {
    //     name: 'face',
    //     onPress: onToggleFaceDetect,
    //     color: COLORS.BLACK_SECONDARY_ALT
    //   }
    //   : {
    //     name: 'face',
    //     onPress: onToggleFaceDetect,
    //     color: COLORS.BLACK_DEACTIVATED_ALT
    //   }
    return {
      header: (
        <NavBar
          navigation={navigation}
          // rightButtons={rightButton}
          title={title}
          // titleRowButton={faceDetectionButton}
        />
      )
    }
  }

  static propTypes = {
    checkEmployeeOnImage: func.isRequired,
    clearUser: func.isRequired,
    hasFaceDetection: bool,
    ipStatus: oneOf(["NOT_SET", "VALID", "INVALID"]),
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
    modalAlert: shape({ isVisible: bool })
  }

  static defaultProps = {
    ipStatus: "NOT_SET",
    hasFaceDetection: true,
    isLoading: false,
    isLoadingClockIn: false,
    isSignUp: false,
    navigation: { navigate: () => {} },
    modalAlert: { isVisible: false }
  }

  componentDidMount = () => {
    const { clearUser, verifyIpAddress, navigation, isLoading } = this.props
    InteractionManager.runAfterInteractions(async () => {
      clearUser()
      verifyIpAddress()
      navigation.setParams({
        exitApp: this.handleExitApp,
        isDisabledOnLoading: isLoading
      })
    })
  }

  componentDidUpdate = prevProps => {
    const { isLoading, navigation } = this.props
    if (prevProps.isLoading !== isLoading)
      navigation.setParams({ isDisabledOnLoading: isLoading })
  }

  handleExitApp = () => {
    const { setFaceDetectionDisabled, setFaceDetectionEnabled } = this.props
    setFaceDetectionDisabled()
    Alert.alert(
      "Sair do aplicativo",
      "Você realmente deseja sair do MagnoRH?",
      [
        {
          text: "Continuar",
          onPress: () => setFaceDetectionEnabled(),
          style: "cancel"
        },
        {
          text: "Sair",
          onPress: () => BackHandler.exitApp(),
          style: "destructive"
        }
      ]
    )
  }

  navigateToHistory = () => {
    const { navigation } = this.props
    navigation.navigate("history")
  }

  onRegisterEmployee = async image => {
    const { checkEmployeeOnImage, navigation } = this.props
    await checkEmployeeOnImage(image, navigation)
  }

  clearUser = () => {
    const {
      navigation,
      clearUser,
      setFaceDetectionEnabled,
      modalAlert,
      setOnDismissModal
    } = this.props
    navigation.setParams({
      userName: undefined
    })
    clearUser()
    if (modalAlert.isVisible) {
      return setOnDismissModal(setFaceDetectionEnabled)
    }
    return setFaceDetectionEnabled()
  }

  toggleFaceDetection = () => {
    const {
      hasFaceDetection,
      setFaceDetectionEnabled,
      setFaceDetectionDisabled
    } = this.props
    return hasFaceDetection
      ? setFaceDetectionDisabled()
      : setFaceDetectionEnabled()
  }

  onCleanPreview = () => {
    const {
      modalAlert,
      setOnDismissModal,
      setFaceDetectionEnabled
    } = this.props
    if (modalAlert.isVisible) {
      return setOnDismissModal(setFaceDetectionEnabled)
    }
  }

  render() {
    const {
      isLoading,
      isLoadingClockIn,
      isSignUp,
      registerEmployeeEntry,
      trainEmployeePhoto,
      verifyEmployeePhoto,
      showLoading,
      ipStatus,
      setFaceDetectionDisabled,
      hasFaceDetection,
      setFaceDetectionEnabled
    } = this.props
    const isLoadingPhoto = isLoading || isLoadingClockIn
    return (
      <Home
        onCleanPreview={this.onCleanPreview}
        isLoading={isLoadingPhoto}
        isSignUp={isSignUp}
        onHistoryPress={this.navigateToHistory}
        onRegisterEmployee={this.onRegisterEmployee}
        onRegisterEmployeeEntryPress={registerEmployeeEntry}
        onTrainEmployeePhotoPress={trainEmployeePhoto}
        verifyEmployeePhoto={verifyEmployeePhoto}
        onTakePicture={showLoading}
        clearUser={this.clearUser}
        ipStatus={ipStatus}
        onEnableFaceDetection={setFaceDetectionEnabled}
        onDisableFaceDetection={setFaceDetectionDisabled}
        hasFaceDetection={hasFaceDetection}
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  isLoading: getLoading(state),
  isLoadingClockIn: getLoadingClockIn(state),
  isSignUp: props.navigation.getParam("signUp", false),
  modalAlert: getModalState(state),
  user: getUser(state),
  ipStatus: getIpStatus(state),
  networkType: getNetworkType(state),
  hasFaceDetection: getFaceDetection(state)
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
  setOnDismissModal: onDismiss => setOnDismissModal(onDismiss)
}

export const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenContainer)
