import { createStackNavigator as Navigator } from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'

import { HistoryScreen } from '../modules/history/containers/HistoryScreen'
import { mainStack } from './mainStack'

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

export const initialRouteName = 'main'

export const Stack = Navigator(
  {
    main: { screen: mainStack },
    history: { screen: HistoryScreen },
  },
  {
    initialRouteName,
    headerMode: 'none',
  }
)

export const StackNavigator = reduxifyNavigator(Stack, 'root')
