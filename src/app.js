import React from 'react'
import { NetInfo } from 'react-native'
import { shape, func } from 'prop-types'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'glamorous-native'

import { Navigator } from './navigation'
import { setUpConfigs } from './config'
import { saveUser, setNetworkType } from './redux/actions/sync/syncAuthActions'
import { getUserRegistration } from './config/functions'
import { appTheme } from './constants/theme/appTheme'

export class App extends React.Component {
  static propTypes = {
    store: shape({
      dispatch: func,
      getState: func,
      replaceReducer: func,
      subscribe: func,
    }),
  }

  static defaultProps = {
    store: {
      dispatch: () => {},
      getState: () => {},
      replaceReducer: () => {},
      subscribe: () => {},
    },
  }

  constructor(props) {
    super(props)
    this.state = { loaded: false, isLogged: false, user: {} }
  }

  componentDidMount = () => {
    const { store } = this.props
    setUpConfigs()
    getUserRegistration().then(user => {
      const hasId =
        typeof user.registration !== 'undefined' && user.registration !== ''
      this.setState({
        user,
        isLogged: hasId,
        loaded: true,
      })
      store.dispatch(saveUser(user))
    })
    NetInfo.getConnectionInfo().then(this.handleNetworkChange)
    NetInfo.addEventListener('connectionChange', this.handleNetworkChange)
  }

  componentWillUnmount = () => {
    NetInfo.removeEventListener('connectionChange', this.handleNetworkChange)
  }

  handleNetworkChange = ({ type }) =>
    this.props.store.dispatch(setNetworkType(type))

  render() {
    const { loaded, user, isLogged } = this.state
    const { store } = this.props
    return (
      loaded && (
        <Provider store={store}>
          <ThemeProvider theme={appTheme}>
            <Navigator user={user} isLogged={isLogged} />
          </ThemeProvider>
        </Provider>
      )
    )
  }
}
