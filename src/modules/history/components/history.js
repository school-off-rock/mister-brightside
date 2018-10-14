import React, { Component } from 'react'
import {
  View,
  InteractionManager,
} from 'react-native'
import { bool, func, array } from 'prop-types'
import { ScreenContainerHOC } from '../../shared/components/hoc/ScreenContainerHOC'
import { StatusBarStandard } from '../../shared/components/StatusBarStandard'
import { HistoryDatePicker } from './HistoryDatePicker'
import { styles } from '../../shared/components/styles/shared.style'

const Container = ScreenContainerHOC(View)

export class History extends Component {
  static propTypes = {
    loadingEntries: bool.isRequired,
    fetchHistoryList: func.isRequired,
    historyList: array.isRequired
  }

  state = {
    rendering: true,
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ rendering: false })
    })
  }

  render() {
    const { loadingEntries, historyList, fetchHistoryList } = this.props
    console.log(historyList)
    return (
      <Container style={styles.container}>
        <StatusBarStandard />
        <HistoryDatePicker fetchHistoryList={fetchHistoryList} />
      </Container>
    )
  }
}
