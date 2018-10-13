import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { func, object } from 'prop-types'
import { NavigationActions } from 'react-navigation'

import { StackNavigator } from './navigator'

class Stack extends Component {

  static propTypes = {
    dispatch: func.isRequired,
    nav: object.isRequired,
  };

  state = { loaded: true }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    dispatch(NavigationActions.back())
    // eslint-disable-next-line react/destructuring-assignment
    return nav !== this.props.nav
  }

  render() {
    const { dispatch, nav } = this.props
    const { loaded } = this.state
    return loaded && <StackNavigator state={nav} dispatch={dispatch} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
})

export const Navigator = connect(mapStateToProps)(Stack)
