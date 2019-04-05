import { createStackNavigator } from 'react-navigation'

import { HomeScreen } from '../modules/home/containers/HomeScreen'
import { RegisterCameraScreen } from '../modules/register/containers/RegisterCameraScreen'
import { RecognizeScreen } from '../modules/recognize/containers/RecognizeScreen'

export const initialRouteName = 'home'

export const mainStack = createStackNavigator(
  {
    home: { screen: HomeScreen },
    registerCamera: { screen: RegisterCameraScreen },
    recognize: { screen: RecognizeScreen },
  },
  {
    initialRouteName,
    headerMode: 'none',
  }
)
