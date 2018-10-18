import { StatusBar, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

const setStyleByScreen = (nextScreen) => {
  switch (nextScreen) {
    case 'home':
      return Platform.OS === 'ios' ? 'dark-content' : 'light-content'
    default:
      return 'dark-content'
  }
}

const screenTracking = ({ getState }) => next => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE
    && action.type !== NavigationActions.BACK
  ) {
    return next(action)
  }

  const currentScreen = getCurrentRouteName(getState().nav)
  const result = next(action)
  const nextScreen = getCurrentRouteName(getState().nav)
  if (nextScreen !== currentScreen) {
    StatusBar.setBarStyle(setStyleByScreen(nextScreen), true)
  }
  return result
}

export default screenTracking
