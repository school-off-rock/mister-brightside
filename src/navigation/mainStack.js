// @flow

import { createStackNavigator } from 'react-navigation'

import { HomeScreen } from '../modules/home/containers/HomeScreen'
import { RegisterCameraScreen } from '../modules/register/containers/RegisterCameraScreen'

export const initialRouteName = 'home'

export const mainStack = createStackNavigator(
  {
    home: { screen: HomeScreen },
    registerCamera: { screen: RegisterCameraScreen },
  },
  {
    initialRouteName,
  }
)
