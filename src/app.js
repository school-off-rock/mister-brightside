
import React from 'react'
import { shape, func } from 'prop-types'
import { Provider } from 'react-redux'
import { Navigator } from './navigation'
import { setUpConfigs } from './config'
import { saveUser } from './redux/actions/sync/syncAuthActions'
import { getUserRegistration } from './config/functions'

export class App extends React.Component {
  static propTypes = {
    store: shape({
      dispatch: func,
      getState: func,
      replaceReducer: func,
      subscribe: func
    })
  }

  static defaultProps = {
    store: {
      dispatch: () => {},
      getState: () => {},
      replaceReducer: () => {},
      subscribe: () => {},
    }
  }

  constructor(props) {
    super(props)
    // Text.defaultProps.allowFontScaling = false
    this.state = { loaded: false, isLogged: false, user: {} }
  }

  componentDidMount = () => {
    setUpConfigs()
    getUserRegistration().then((user) => {
      const hasId = ((typeof user.registration !== 'undefined') && (user.registration !== ''))
      this.setState({
        user,
        isLogged: hasId,
        loaded: true
      })
      this.props.store.dispatch(saveUser(user))
    })
  }

  render() {
    const { loaded, user, isLogged } = this.state
    const { store } = this.props
    return (
      loaded
      && (
      <Provider store={store}>
        <Navigator user={user} isLogged={isLogged} />
      </Provider>
      )
    )
  }
}
