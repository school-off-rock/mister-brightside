import React, { Component } from 'react'
import { View, Image, StyleSheet, Platform } from 'react-native'
import { SafeAreaView } from 'react-navigation'

import { func, bool, shape, string } from 'prop-types'

import { StatusBarDark } from '../../shared/components/StatusBarDark'
import { H5 } from '../../shared/components/text'
import { Icon } from '../../shared/components/Icon'
import { FabFooter } from './FabFooter'
import { UserContainer } from '../containers/UserContainer'

import { styles } from '../styles/styles.home'
import { COLORS } from '../../../constants/theme'

export class Home extends Component {
  static propTypes = {
    clearUser: func.isRequired,
    isLoading: bool,
    isLoggedIn: bool,
    setModal: func.isRequired,
    user: shape({ label: string, id: string }),
    onRegisterPress: func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isLoggedIn: false,
    user: { id: undefined, label: undefined },
  }

  render() {
    const { onRegisterPress } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <StatusBarDark />
        <View style={styles.preview}>
          <View style={styles.navbar}>
            <H5 style={styles.navTitle}>SORRIA</H5>
            <Icon
              name="account-plus"
              color={COLORS.PRIMARY}
              onPress={onRegisterPress}
            />
          </View>
          <View style={styles.preview}>
            <UserContainer />
          </View>
          <FabFooter onPress={onRegisterPress} />
        </View>
      </SafeAreaView>
    )
  }
}
