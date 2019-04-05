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
import { hasText } from '../../../config/functions'

export class Home extends Component {
  static propTypes = {
    clearUser: func.isRequired,
    isLoading: bool,
    isLoggedIn: bool,
    setModal: func.isRequired,
    user: shape({ label: string, id: string }),
    onRegisterPress: func.isRequired,
    onRecognizePress: func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isLoggedIn: false,
    user: { id: undefined, label: undefined },
  }

  render() {
    const { onRegisterPress, onRecognizePress, user, clearUser } = this.props
    const [navIconName, navIconColor, navIconOnPress] = hasText(user.label)
      ? ['exit-to-app', COLORS.BLACK_SECONDARY_ALT, clearUser]
      : ['account-plus', COLORS.PRIMARY, onRegisterPress]

    return (
      <SafeAreaView style={styles.container}>
        <StatusBarDark />
        <View style={styles.preview}>
          <View style={styles.navbar}>
            <H5 style={styles.navTitle}>SORRIA</H5>
            <Icon
              name={navIconName}
              color={navIconColor}
              onPress={navIconOnPress}
            />
          </View>
          <View style={styles.preview}>
            <UserContainer user={user} />
          </View>
          <FabFooter onPress={onRecognizePress} />
        </View>
      </SafeAreaView>
    )
  }
}
