import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InteractionManager } from 'react-native'
import {
  func,
  shape,
  bool,
} from 'prop-types'

import {
  registerEmployeeAction,
  verifyEmployeePhotoAction,
  trainEmployeePhotoAction,
  clearUserAction,
  checkEmployeeOnImageAction
} from '../../../redux/actions/async/asyncAuthActions'
import { registerEmployeeEntryAction, } from '../../../redux/actions/async/asyncClockEntryActions'
import { showLoading } from '../../../redux/actions/sync/syncAuthActions'
import { getLoading, getUser } from '../../../redux/reducers/auth/selectors'
import { getLoadingClockIn } from '../../../redux/reducers/clockEntry/selectors'
import { getModalState } from '../../../redux/reducers/modal/selectors'

import { Home } from '../components/Home'
import { NavBar } from '../../shared/containers/NavBar'

import { hasText, getUserRegistration } from '../../../config/functions'

class HomeScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const userName = navigation.getParam('userName', '')
    // const isDisabledOnLoading = navigation.getParam('isDisabledOnLoading', false)

    const firstName = hasText(userName) ? `${userName.charAt(0)}${userName.slice(1, userName.length).toLowerCase()}` : ''
    // const welcomeText = hasText(firstName) ? `Olá, ${firstName}` : ''
    const title = hasText(userName) ? `Olá, ${firstName}` : 'Tirar foto'
    // const rightButton = [{ name: 'account-switch', onPress: () => navigation.navigate('signIn'), disabled: isDisabledOnLoading }]
    return ({
      header: <NavBar
        navigation={navigation}
        title={title}
        // rightButtons={rightButton}
      />
    })
  }

  static propTypes = {
    isLoading: bool,
    isLoadingClockIn: bool,
    isSignUp: bool,
    navigation: shape({ navigate: func }),
    showLoading: func.isRequired,
    // registerEmployee: func.isRequired,
    checkEmployeeOnImage: func.isRequired,
    registerEmployeeEntry: func.isRequired,
    trainEmployeePhoto: func.isRequired,
    verifyEmployeePhoto: func.isRequired,
    clearUser: func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isLoadingClockIn: false,
    isSignUp: false,
    navigation: { navigate: () => {} },
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(async () => {
      this.props.clearUser()
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

  render() {
    const {
      isLoading,
      isLoadingClockIn,
      isSignUp,
      registerEmployeeEntry,
      trainEmployeePhoto,
      verifyEmployeePhoto,
      showLoading,
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
})

const mapDispatchToProps = {
  verifyEmployeePhoto: image => verifyEmployeePhotoAction(image),
  // registerEmployee: (employee, image, navigation) => registerEmployeeAction(employee, image, navigation),
  checkEmployeeOnImage: (image, navigation) => checkEmployeeOnImageAction(image, navigation),
  registerEmployeeEntry: () => registerEmployeeEntryAction(),
  trainEmployeePhoto: image => trainEmployeePhotoAction(image),
  clearUser: () => clearUserAction(),
  showLoading,
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)
