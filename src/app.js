
import React from 'react'
import { InteractionManager } from 'react-native'
import { shape, func } from 'prop-types'
import { Provider } from 'react-redux'
import { Navigator } from './navigation'
import { setUpConfigs } from './config'

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
    this.state = { loaded: false, user: {} }
  }

  componentDidMount = () => {
    setUpConfigs()
    InteractionManager.runAfterInteractions(() => this.setState({ loaded: true }))
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
