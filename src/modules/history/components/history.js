import React, { Component } from 'react'
import {
  InteractionManager,
  SectionList,
} from 'react-native'
import moment from 'moment'
import { bool, func, array } from 'prop-types'
import { HistoryDatePicker } from './HistoryDatePicker'
import { HistoryItem } from './HistoryItem'
import { RowLoading } from '../../shared/components/rows/RowLoading'
import { ViewAvoidNavBar } from '../../shared/containers/ViewAvoidNavBar'
import { Caption } from '../../shared/components/text'

import { styles } from '../../shared/components/styles/shared.style'
import { styles as historyStyles } from '../styles/history.styles'

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

  renderItem = ({ item }) => {
    const { clockIn, clockOut } = item
    return (
      <HistoryItem
        clockIn={clockIn}
        clockOut={clockOut}
      />
    )
  }

  renderDay = ({ section = {} }) => {
    if (section.title) {
      const title = moment(section.title).format('D [de] MMMM [de] YYYY')
      return (
        <Caption style={historyStyles.sectionTitle}>{title.toUpperCase()}</Caption>
      )
    }
    return null
  }

  render() {
    const { loadingEntries, historyList, fetchHistoryList } = this.props
    const { rendering } = this.state
    return (
      <ViewAvoidNavBar style={styles.container}>
        <HistoryDatePicker fetchHistoryList={fetchHistoryList} />
        { (loadingEntries) || (rendering)
          ? <RowLoading isActive={loadingEntries} />
          : (
            <SectionList
              ListFooterComponent={this.renderLoading}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              renderSectionHeader={this.renderDay}
              sections={historyList}
            />
          )
        }
      </ViewAvoidNavBar>
    )
  }
}
