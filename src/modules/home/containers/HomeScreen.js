import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  bool,
  func,
  shape,
  string,
  oneOf,
} from 'prop-types'

import { getLoading } from '../../../redux/reducers/auth/selectors'
import { getModalState } from '../../../redux/reducers/modal/selectors'
import { registerEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { setModalAction } from '../../../redux/actions/sync/syncModalAction'

import { Home } from '../components/Home'
import { NavBarLarge } from '../../shared/components/NavBarLarge'

import { hasText } from '../../../config/functions'

class HomeScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const userName = navigation.getParam('userName', '')
    return ({
      header: <NavBarLarge
        navigation={navigation}
        title={hasText(userName) ? `Olá, ${userName}` : ''}
        rightButtons={[{ name: 'account-plus', onPress: () => navigation.navigate('signIn') }]}
      />
    })
  }

  static propTypes = {
    registerEmployee: func.isRequired,
    navigation: shape({ navigate: func }),
    modalAlert: shape({
      isVisible: bool,
      theme: oneOf(['PRIMARY', 'SUCCESS', 'ALERT']).isRequired,
      title: string,
      description: string,
      iconName: string,
    })
  }

  static defaultProps = {
    modalAlert: { isVisible: false }
  }

  static defaultProps = {
    navigation: { navigate: () => {} }
  }

  state = {}

  navigateToHistory = () => {
    const { navigation } = this.props
    navigation.navigate('history')
  }

  takePicture = async () => {
    if (this.camera) {
      const { registerEmployee } = this.props
      const options = { quality: 0.5, base64: true, forceUpOrientation: true }
      const data = await this.camera.takePictureAsync(options)
      registerEmployee('', data.base64)
    }
  };

  render() {
    const { registerEmployee, modalAlert } = this.props
    return (
      <Home
        registerEmployee={registerEmployee}
        onHistoryPress={this.navigateToHistory}
        modalAlert={modalAlert}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state),
  modalAlert: getModalState(state),
})

const mapDispatchToProps = {
  registerEmployee: (registration, image) => registerEmployeeAction(registration, image),
  setModal: (isVisible, theme, title, description, iconName) => setModalAction(isVisible, theme, title, description, iconName)
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)
