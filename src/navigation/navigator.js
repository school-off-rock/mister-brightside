import { createStackNavigator as Navigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import { SignInScreen } from '../modules/auth/containers/SignUpScreen'
import { HomeScreen } from '../modules/home/containers/HomeScreen'
import { HistoryScreen } from '../modules/history/containers/HistoryScreen'

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)

export const initialRouteName = 'home'

export const Stack = Navigator({
  signIn: { screen: SignInScreen },
  home: { screen: HomeScreen },
  history: { screen: HistoryScreen },
}, {
  initialRouteName,
})

export const StackNavigator = reduxifyNavigator(Stack, 'root')
