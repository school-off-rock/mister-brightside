import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} from 'prop-types'

import { navBarHeightUpdate } from '../../../redux/actions/sync/syncNavBarActions'
import { getNavBarHeight } from '../../../redux/reducers/navBar/selectors'

import { NavBarLarge } from '../components/NavBarLarge'

class NavBarContainer extends Component {
  static propTypes = {
    navBarHeightUpdate: func.isRequired,
    height: number.isRequired,
    hasHelp: bool,
    navigation: shape({ goBack: func }).isRequired,
    rightButtons: arrayOf(shape({ name: string, onPress: func })),
    title: string,
  }

  static defaultProps = {
    hasHelp: true,
    rightButtons: [],
    title: undefined,
  }

  updateHeight = height => this.props.navBarHeightUpdate(height)

  render() {
    const {
      height,
      hasHelp,
      navigation,
      rightButtons,
      title,
    } = this.props
    return (
      <NavBarLarge
        actualHeight={height}
        onHeightUpdate={this.updateHeight}
        hasHelp={hasHelp}
        navigation={navigation}
        rightButtons={rightButtons}
        title={title}
      />
    )
  }
}

const mapStateToProps = state => ({
  height: getNavBarHeight(state)
})

const mapDispatchToProps = {
  navBarHeightUpdate
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarContainer)
