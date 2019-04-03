import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import {
  withNavigation,
  HeaderBackButton,
  SafeAreaView,
} from 'react-navigation'
import { node } from 'prop-types'
import glamorous from 'glamorous-native'

const NavBarAbsolute = glamorous(SafeAreaView)((props, theme) => ({
  ...StyleSheet.absoluteFillObject,
  bottom: null,
  paddingTop: theme.statusBarHeight,
  flexDirection: 'row',
}))

const BackButtonWrap = glamorous.view({
  ...StyleSheet.absoluteFillObject,
  alignItems: 'center',
  justifyContent: 'center',
})

const Circle = glamorous.view((props, theme) => ({
  width: 32,
  borderRadius: 16,
  aspectRatio: 1,
  backgroundColor: theme.colors.text.darkDeactivated,
}))

const Fill = glamorous.view({ flex: 1 })

function NavBarContainer({ navigation, right }) {
  return (
    <NavBarAbsolute>
      <View>
        {Platform.OS !== 'ios' && (
          <BackButtonWrap>
            <Circle />
          </BackButtonWrap>
        )}
        <HeaderBackButton
          tintColor={'white'}
          onPress={() => navigation.goBack(null)}
        />
      </View>
      <Fill />
      {right}
    </NavBarAbsolute>
  )
}

NavBarContainer.propTypes = {
  right: node,
}

NavBarContainer.defaultProps = {
  right: null,
}

export const NavBarTransparent = withNavigation(NavBarContainer)
