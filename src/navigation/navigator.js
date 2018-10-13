import { createStackNavigator as Navigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import { HomeScreen } from '../modules/home/containers/HomeScreen'

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)

export const initialRouteName = 'home'

export const Stack = Navigator({
  home: { screen: HomeScreen },
}, {
  headerMode: 'none',
  initialRouteName,
})

export const StackNavigator = reduxifyNavigator(Stack, 'root')
