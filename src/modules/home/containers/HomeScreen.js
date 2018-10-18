import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, shape } from 'prop-types'

import { registerEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'

import { Home } from '../components/Home'
import { NavBarLarge } from '../../shared/components/NavBarLarge'

import { hasText } from '../../../config/functions'

class HomeScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const userName = navigation.getParam('userName', '')
    const signUp = navigation.getParam('signUp', '')
    const welcomeText = hasText(userName) ? `Olá, ${userName}` : ''
    const title = signUp ? 'Tirar foto' : welcomeText
    const rightButton = [{ name: 'account-plus', onPress: () => navigation.navigate('signIn') }]
    const rightButtons = signUp ? [] : rightButton
    return ({
      header: <NavBarLarge
        navigation={navigation}
        title={title}
        rightButtons={rightButtons}
      />
    })
  }

  static propTypes = {
    registerEmployee: func.isRequired,
    navigation: shape({ navigate: func })
  }

  static defaultProps = {
    navigation: { navigate: () => {} }
  }


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
    const { navigation } = this.props
    const signUp = navigation.getParam('signUp', '') || false
    return (
      <Home
        registerEmployee={this.onRegisterEmployee}
        onHistoryPress={this.navigateToHistory}
        isSignUp={signUp}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state)
})

const mapDispatchToProps = {
  registerEmployee: (employee, image, navigation) => registerEmployeeAction(employee, image, navigation)
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)
