import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, shape, bool, string } from 'prop-types'

import { clearUserAction } from '../../../redux/actions/async/asyncAuthActions'
import { showLoading } from '../../../redux/actions/sync/syncAuthActions'
import {
  getLoading,
  getUser,
  getNetworkType,
  getLoggedIn,
} from '../../../redux/reducers/auth/selectors'
import {
  setOnDismissModal,
  setModalAction,
} from '../../../redux/actions/sync/syncModalAction'

import { Home } from '../components/Home'

class HomeScreenContainer extends Component {
  static propTypes = {
    clearUser: func.isRequired,
    isLoading: bool,
    navigation: shape({ navigate: func }),
    showLoading: func.isRequired,
    setOnDismissModal: func.isRequired,
    setModal: func.isRequired,
    modalAlert: shape({ isVisible: bool }),
    user: shape({ id: string, label: string }),
  }

  static defaultProps = {
    isLoading: false,
    navigation: { navigate: () => {} },
    modalAlert: { isVisible: false },
    user: shape({ id: undefined, label: undefined }),
  }

  navigateToRegister = () => {
    const { navigation } = this.props
    navigation.navigate('registerCamera')
  }

  render() {
    const {
      isLoading,
      showLoading,
      setModal,
      clearUser,
      user,
      isLoggedIn,
    } = this.props
    return (
      <Home
        clearUser={clearUser}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        onTakePicture={showLoading}
        setModal={setModal}
        user={user}
        onRegisterPress={this.navigateToRegister}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state),
  user: getUser(state),
  networkType: getNetworkType(state),
  isLoggedIn: getLoggedIn(state),
})

const mapDispatchToProps = {
  clearUser: () => clearUserAction(),
  showLoading,
  setOnDismissModal: onDismiss => setOnDismissModal(onDismiss),
  setModal: modal => setModalAction(modal),
}

export const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenContainer)
