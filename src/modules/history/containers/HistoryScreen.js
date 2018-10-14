import React, { Component } from 'react'
import {
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'

import { registerEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'
import { History } from '../components/history'

class HistoryScreenContainer extends Component {
  state = {}

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      console.log('Screen loaded')
    })
  }


  render() {
    return (
      <History />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state)
})

const mapDispatchToProps = {
  registerEmployee: (registration, image) => registerEmployeeAction(registration, image)
}

export const HistoryScreen = connect(mapStateToProps, mapDispatchToProps)(HistoryScreenContainer)
