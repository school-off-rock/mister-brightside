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
    isLoading: bool,
    isLoadingClockIn: bool,
    isSignUp: bool,
    navigation: shape({ navigate: func }),
    registerEmployee: func.isRequired,
    registerEmployeeEntry: func.isRequired,
    trainEmployeePhoto: func.isRequired,
    verifyEmployeePhoto: func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isLoadingClockIn: false,
    isSignUp: false,
    navigation: { navigate: () => {} },
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(async () => {
      const { navigation } = this.props
      const user = await getUserRegistration()
      navigation.setParams({ userName: user.firstName })
    })
  }

  componentWillUnmount = () => this.blurSubscription.remove()

  navigateToHistory = () => {
    const { navigation } = this.props
    navigation.navigate('history')
  }

  onRegisterEmployee = async (image) => {
    const { registerEmployee, navigation } = this.props
    const employee = navigation.getParam('employee', '')
    await registerEmployee(employee, image, navigation)
    navigation.setParams({ signUp: false })
  }

  render() {
    const {
      isLoading,
      isLoadingClockIn,
      isSignUp,
      registerEmployeeEntry,
      trainEmployeePhoto,
      verifyEmployeePhoto,
    } = this.props
    const isLoadingPhoto = isLoading || isLoadingClockIn
    return (
      <Home
        onRegisterEmployee={this.onRegisterEmployee}
        onHistoryPress={this.navigateToHistory}
        verifyEmployeePhoto={verifyEmployeePhoto}
        onRegisterEmployeeEntryPress={registerEmployeeEntry}
        onTrainEmployeePhotoPress={trainEmployeePhoto}
        isSignUp={isSignUp}
        isLoading={isLoadingPhoto}
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  isSignUp: props.navigation.getParam('signUp', '') || false,
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
