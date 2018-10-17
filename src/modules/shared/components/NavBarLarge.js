import React, { Component } from 'react'
import {
  View, StyleSheet, Platform
} from 'react-native'

import {
  arrayOf,
  bool,
  func,
  shape,
  string,
} from 'prop-types'
import { SafeAreaView, HeaderBackButton } from 'react-navigation'

import { H2 } from './text'
import { Icon } from './Icon'
import { NavBarLogo } from './NavBarLogo'
import { ViewBlurIOS } from './ViewBlurIOS'

import { COLORS, METRICS } from '../../../constants/theme'
import { hasText } from '../../../config/functions'

export class NavBarLarge extends Component {
  static propTypes = {
    hasBackButton: bool,
    hasHelp: bool,
    navigation: shape({ goBack: func }).isRequired,
    rightButtons: arrayOf(shape({ name: string, onPress: func })),
    title: string,
  }

  static defaultProps = {
    hasBackButton: true,
    hasHelp: true,
    rightButtons: [],
    title: undefined,
  }

  state = { itsAClass: true }

  renderRightIcons = ({ name, onPress }) => (
    <Icon
      key={name}
      name={name}
      color={COLORS.PRIMARY}
      onPress={onPress}
    />
  )

  render() {
    const {
      hasHelp,
      navigation,
      title,
      rightButtons,
    } = this.props
    const { state } = navigation.dangerouslyGetParent()
    const hasBackButton = state && state.index > 0
    return (
      <ViewBlurIOS style={s.container}>
        <SafeAreaView>
          <View style={s.topRow}>
            {hasBackButton && (
              <HeaderBackButton
                tintColor={COLORS.PRIMARY}
                onPress={() => navigation.goBack()}
              />
            )}
            <View style={s.logoWrap}>
              <NavBarLogo />
            </View>
            {(hasHelp || (rightButtons && rightButtons.length >= 1)) && (
            <View style={s.rightItemsWrap}>
              {(rightButtons && rightButtons.length >= 1)
                  && rightButtons.map(this.renderRightIcons)
                }
              {hasHelp && (
              <Icon
                name="help-circle-outline"
                color={COLORS.PRIMARY}
                onPress={() => navigation.navigate('signIn')}
              />
              )}
            </View>
            )}
          </View>
          { hasText(title) && <H2 numberOfLines={1} style={s.pageTitle}>{title}</H2> }
        </SafeAreaView>
      </ViewBlurIOS>
    )
  }
}

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    bottom: null,
    borderBottomColor: COLORS.DARK_DIVIDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        paddingTop: METRICS.STATUS_BAR_HEIGHT,
      }
    })
  },
  topRow: {
    height: METRICS.NAV_BAR_DATA_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoWrap: {
    flex: 1,
  },
  rightItemsWrap: {
    marginRight: METRICS.NANO,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pageTitle: {
    marginVertical: METRICS.BIT,
    marginHorizontal: METRICS.KILO,
  }
})
