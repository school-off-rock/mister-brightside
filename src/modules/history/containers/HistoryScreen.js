import React, { Component } from 'react'
import {
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import { func, bool, array } from 'prop-types'
import moment from 'moment'
import { fetchEmployeeEntriesAction } from '../../../redux/actions/async/asyncClockEntryActions'
import { getLoadingEntries, getClockEntries } from '../../../redux/reducers/clockEntry/selectors'
import { History } from '../components/History'

class HistoryScreenContainer extends Component {
  static propTypes = {
    fetchHistory: func.isRequired,
    isLoading: bool.isRequired,
    historyList: array.isRequired
  }

  state = {}

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      const { fetchHistory } = this.props
      const initialDate = moment().format('YYYY-MM-DD')
      const endDate = moment().format('YYYY-MM-DD')
      fetchHistory(initialDate, endDate)
    })
  }


  render() {
    const { isLoading, historyList, fetchHistory } = this.props
    return (
      <History
        loadingEntries={isLoading}
        historyList={historyList}
        fetchHistoryList={fetchHistory}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingEntries(state),
  historyList: getClockEntries(state)
})

const mapDispatchToProps = {
  fetchHistory: (initDate, endDate) => fetchEmployeeEntriesAction(initDate, endDate)
}

export const HistoryScreen = connect(mapStateToProps, mapDispatchToProps)(HistoryScreenContainer)
