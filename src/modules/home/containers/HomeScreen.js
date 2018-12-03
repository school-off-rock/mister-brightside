import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InteractionManager } from 'react-native'
import {
  func, shape, bool, oneOf
} from 'prop-types'

import {
  verifyEmployeePhotoAction, trainEmployeePhotoAction, clearUserAction, checkEmployeeOnImageAction, verifyIpAddressAction
} from '../../../redux/actions/async/asyncAuthActions'
import { registerEmployeeEntryAction } from '../../../redux/actions/async/asyncClockEntryActions'
import { showLoading, setFaceDetectionEnabled, setFaceDetectionDisabled } from '../../../redux/actions/sync/syncAuthActions'
import {
  getLoading, getUser, getIpStatus, getNetworkType, getFaceDetection
} from '../../../redux/reducers/auth/selectors'
import { getLoadingClockIn } from '../../../redux/reducers/clockEntry/selectors'
import { getModalState } from '../../../redux/reducers/modal/selectors'

import { Home } from '../components/Home'
import { NavBar } from '../../shared/containers/NavBar'

import { hasText } from '../../../config/functions'
import { COLORS } from '../../../constants/theme'

class HomeScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const userName = navigation.getParam('userName', '')
    const hasFaceDetection = navigation.getParam('hasFaceDetection', true)
    const onToggleFaceDetect = navigation.getParam('onToggleFaceDetect', () => {})
    // const isDisabledOnLoading = navigation.getParam('isDisabledOnLoading', false)

    const firstName = hasText(userName) ? `${userName.charAt(0)}${userName.slice(1, userName.length).toLowerCase()}` : ''
    // const welcomeText = hasText(firstName) ? `Olá, ${firstName}` : ''
    const title = hasText(userName) ? `Olá, ${firstName}` : 'Tirar foto'
    // const rightButton = [{ name: 'account-switch', onPress: () => navigation.navigate('signIn'), disabled: isDisabledOnLoading }]
    const faceDetectionButton = hasFaceDetection
      ? { name: 'face', onPress: onToggleFaceDetect, color: COLORS.BLACK_SECONDARY_ALT }
      : { name: 'face', onPress: onToggleFaceDetect, color: COLORS.BLACK_DEACTIVATED_ALT }
    return {
      header: (
        <NavBar
          navigation={navigation}
          title={title}
          titleRowButton={faceDetectionButton}

          // rightButtons={rightButton}
        />
      )
    }
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
    verifyIpAddress: func.isRequired
  }

  static defaultProps = {
    ipStatus: 'NOT_SET',
    hasFaceDetection: true,
    isLoading: false,
    isLoadingClockIn: false,
    isSignUp: false,
    navigation: { navigate: () => {} }
  }

  componentDidMount = () => {
    const {
      clearUser, verifyIpAddress, navigation, hasFaceDetection
    } = this.props
    InteractionManager.runAfterInteractions(async () => {
      clearUser()
      verifyIpAddress()
      navigation.setParams({
        hasFaceDetection,
        onToggleFaceDetect: this.toggleFaceDetection
      })
      // const {
      // navigation,
      // isLoadingClockIn,
      // isLoading
      // } = this.props
      // const user = await getUserRegistration()
      // navigation.setParams({
      //   userName: user.firstName,
      // isDisabledOnLoading: isLoadingClockIn || isLoading,
      // })
    })
  }

  // componentDidUpdate = (prevProps) => {
  //   const { isLoadingClockIn, isLoading, navigation } = this.props
  // if ((prevProps.isLoadingClockIn !== isLoadingClockIn) || (prevProps.isLoading !== isLoading)) {
  //   navigation.setParams({
  //     isDisabledOnLoading: isLoadingClockIn || isLoading,
  //   })
  // }
  // }

  componentDidUpdate = (prevProps) => {
    const { hasFaceDetection } = this.props
    if (prevProps.hasFaceDetection !== hasFaceDetection) {
      this.props.navigation.setParams({ hasFaceDetection })
    }
  }

  navigateToHistory = () => {
    const { navigation } = this.props
    navigation.navigate('history')
  }

  onRegisterEmployee = async (image) => {
    const { checkEmployeeOnImage, navigation } = this.props
    await checkEmployeeOnImage(image, navigation)
  }

  clearUser = () => {
    this.props.navigation.setParams({ userName: undefined })
    this.props.clearUser()
  }

  toggleFaceDetection = () => {
    const { hasFaceDetection, setFaceDetectionEnabled, setFaceDetectionDisabled } = this.props
    return hasFaceDetection ? setFaceDetectionDisabled() : setFaceDetectionEnabled()
  }

  render() {
    const {
      isLoading, isLoadingClockIn, isSignUp, registerEmployeeEntry, trainEmployeePhoto, verifyEmployeePhoto, showLoading, ipStatus, setFaceDetectionDisabled, hasFaceDetection
    } = this.props
    const isLoadingPhoto = isLoading || isLoadingClockIn
    return (
      <Home
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
        onFaceDetect={setFaceDetectionDisabled}
        hasFaceDetection={hasFaceDetection}
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
  hasFaceDetection: getFaceDetection(state)
})

const mapDispatchToProps = {
  verifyEmployeePhoto: image => verifyEmployeePhotoAction(image),
  checkEmployeeOnImage: (image, navigation) => checkEmployeeOnImageAction(image, navigation),
  registerEmployeeEntry: () => registerEmployeeEntryAction(),
  trainEmployeePhoto: image => trainEmployeePhotoAction(image),
  clearUser: () => clearUserAction(),
  verifyIpAddress: () => verifyIpAddressAction(),
  showLoading,
  setFaceDetectionEnabled,
  setFaceDetectionDisabled
}

export const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenContainer)
