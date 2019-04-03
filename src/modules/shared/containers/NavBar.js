import React, { Component } from 'react'

import { connect } from 'react-redux'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'

import { navBarHeightUpdate } from '../../../redux/actions/sync/syncNavBarActions'
import { getNavBarHeight } from '../../../redux/reducers/navBar/selectors'

import { NavBarLarge } from '../components/NavBarLarge'
import {
  setModalAction,
  setOnDismissModal,
} from '../../../redux/actions/sync/syncModalAction'
import { MODAL } from '../../../constants/modals'
import {
  setFaceDetectionEnabled,
  setFaceDetectionDisabled,
} from '../../../redux/actions/sync/syncAuthActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'

class NavBarContainer extends Component {
  static propTypes = {
    hasHelp: bool,
    height: number.isRequired,
    navBarHeightUpdate: func.isRequired,
    navigation: shape({ goBack: func }).isRequired,
    rightButtons: arrayOf(
      shape({
        name: string,
        onPress: func,
        disabled: bool,
      })
    ),
    setFaceDetectionDisabled: func.isRequired,
    setFaceDetectionEnabled: func.isRequired,
    setModal: func.isRequired,
    setOnDismissModal: func.isRequired,
    title: string,
    titleRowButton: shape({ name: string, onPress: func, color: string }),
  }

  static defaultProps = {
    hasHelp: true,
    rightButtons: [],
    title: undefined,
    titleRowButton: undefined,
  }

  updateHeight = height => this.props.navBarHeightUpdate(height)

  showHelpModal = action => {
    const {
      setModal,
      setFaceDetectionDisabled,
      setOnDismissModal,
      setFaceDetectionEnabled,
      navigation,
    } = this.props
    setFaceDetectionDisabled()
    // setModal(MODAL.HELP(action));
    // setOnDismissModal(setFaceDetectionEnabled);
    navigation.navigate('registerCamera')
  }

  render() {
    const {
      height,
      hasHelp,
      navigation,
      rightButtons,
      title,
      titleRowButton,
      isLoading,
    } = this.props
    return (
      <NavBarLarge
        actualHeight={height}
        onHeightUpdate={this.updateHeight}
        hasHelp={hasHelp}
        onPressHelp={this.showHelpModal}
        isHelpDisabled={isLoading}
        navigation={navigation}
        rightButtons={rightButtons}
        title={title}
        titleRowButton={titleRowButton}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state),
  height: getNavBarHeight(state),
})

const mapDispatchToProps = {
  navBarHeightUpdate,
  setModal: modal => setModalAction(modal),
  setFaceDetectionEnabled,
  setFaceDetectionDisabled,
  setOnDismissModal: onDismiss => setOnDismissModal(onDismiss),
}

export const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer)
