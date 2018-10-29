import React, { Component } from 'react'
import {
  View, StyleSheet, Platform
} from 'react-native'

import {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} from 'prop-types'
import { SafeAreaView, HeaderBackButton } from 'react-navigation'

import { H2 } from './text'
import { Icon } from './Icon'
import { NavBarLogo } from './NavBarLogo'
import { ViewBlurIOS } from './ViewBlurIOS'

import { COLORS, METRICS } from '../../../constants/theme'
import { hasText, isFunctionEmpty, openPhonePad } from '../../../config/functions'

export class NavBarLarge extends Component {
  static propTypes = {
    actualHeight: number,
    hasHelp: bool,
    navigation: shape({ goBack: func }).isRequired,
    onHeightUpdate: func,
    onPressHelp: func.isRequired,
    rightButtons: arrayOf(shape({ name: string, onPress: func })),
    title: string,
  }

  static defaultProps = {
    actualHeight: METRICS.NAV_BAR_HEIGHT,
    hasHelp: true,
    onHeightUpdate: () => {},
    rightButtons: [],
    title: undefined,
  }

  onHelpPress = () => this.props.onPressHelp(this.openNumber)

  openNumber = () => openPhonePad(40035159)

  _onLayout = ({ nativeEvent: { layout: { height } } }) => {
    const { actualHeight, onHeightUpdate } = this.props
    if (!isFunctionEmpty(onHeightUpdate) && (actualHeight !== height)) {
      onHeightUpdate(height)
    }
  }

  renderRightIcons = ({ name, onPress, disabled }) => (
    <Icon
      key={name}
      name={name}
      color={COLORS.PRIMARY}
      onPress={onPress}
      disabled={disabled}
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
        <View onLayout={this._onLayout}>
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
                  onPress={this.onHelpPress}
                />
                )}
              </View>
              )}
            </View>
            { hasText(title) && <H2 numberOfLines={1} style={s.pageTitle}>{title}</H2> }
          </SafeAreaView>
        </View>
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
