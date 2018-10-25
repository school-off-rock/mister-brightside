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
  trainEmployeePhotoAction
} from '../../../redux/actions/async/asyncAuthActions'
import { registerEmployeeEntryAction, } from '../../../redux/actions/async/asyncClockEntryActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'
import { getLoadingClockIn } from '../../../redux/reducers/clockEntry/selectors'
import { getModalState } from '../../../redux/reducers/modal/selectors'

import { Home } from '../components/Home'
import { NavBar } from '../../shared/containers/NavBar'

import { hasText, getUserRegistration } from '../../../config/functions'

class HomeScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const userName = navigation.getParam('userName', '')
    const signUp = navigation.getParam('signUp', '')
    const firstName = hasText(userName) ? `${userName.charAt(0)}${userName.slice(1, userName.length).toLowerCase()}` : ''
    const welcomeText = hasText(firstName) ? `Olá, ${firstName}` : ''
    const title = signUp ? 'Tirar foto' : welcomeText
    const rightButton = [{ name: 'account-switch', onPress: () => navigation.navigate('signIn') }]
    const rightButtons = signUp ? [] : rightButton
    return ({
      header: <NavBar
        navigation={navigation}
        title={title}
        rightButtons={rightButtons}
      />
    })
  }

  static propTypes = {
    verifyEmployeePhoto: func.isRequired,
    registerEmployee: func.isRequired,
    registerEmployeeEntry: func.isRequired,
    trainEmployeePhoto: func.isRequired,
    navigation: shape({ navigate: func }),
    isLoading: bool,
    isLoadingClockIn: bool,
  }

  static defaultProps = {
    navigation: { navigate: () => {} },
    isLoading: false,
    isLoadingClockIn: false,
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(async () => {
      const { navigation } = this.props
      const user = await getUserRegistration()
      navigation.setParams({ userName: user.firstName })
    })
  };

  navigateToHistory = () => {
    const { navigation } = this.props
    navigation.navigate('history')
  }

  onRegisterEmployee = async (image) => {
    const { registerEmployee, navigation } = this.props
    const employee = navigation.getParam('employee', '')
    await registerEmployee(employee, image, navigation)
  }

  render() {
    const {
      navigation,
      verifyEmployeePhoto,
      registerEmployeeEntry,
      trainEmployeePhoto,
      isLoading,
      isLoadingClockIn
    } = this.props
    const signUp = navigation.getParam('signUp', '') || false
    const isLoadingPhoto = isLoading || isLoadingClockIn
    return (
      <Home
        registerEmployee={this.onRegisterEmployee}
        onHistoryPress={this.navigateToHistory}
        verifyEmployeePhoto={verifyEmployeePhoto}
        onRegisterEmployeeEntryPress={registerEmployeeEntry}
        onTrainEmployeePhotoPress={trainEmployeePhoto}
        isSignUp={signUp}
        isLoading={isLoadingPhoto}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state),
  isLoadingClockIn: getLoadingClockIn(state),
  modalAlert: getModalState(state),
})

const mapDispatchToProps = {
  verifyEmployeePhoto: image => verifyEmployeePhotoAction(image),
  registerEmployee: (employee, image, navigation) => registerEmployeeAction(employee, image, navigation),
  registerEmployeeEntry: () => registerEmployeeEntryAction(),
  trainEmployeePhoto: image => trainEmployeePhotoAction(image),
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)
