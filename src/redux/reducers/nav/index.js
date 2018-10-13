import { NavigationActions } from 'react-navigation'
import { initialRouteName, Stack } from '../../../navigation/navigator'

const initialState = Stack.router.getStateForAction(NavigationActions.navigate({ routeName: initialRouteName }))

export const navigationReducer = (state = initialState, action) => {
  const nextState = Stack.router.getStateForAction(action, state)
  return nextState || state
}
