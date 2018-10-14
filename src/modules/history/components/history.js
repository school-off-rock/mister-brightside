import React, { Component } from 'react'
import {
  View,
  InteractionManager,
  SectionList,
  Text,
} from 'react-native'
import moment from 'moment'
import { bool, func, array } from 'prop-types'
import { ScreenContainerHOC } from '../../shared/components/hoc/ScreenContainerHOC'
import { StatusBarStandard } from '../../shared/components/StatusBarStandard'
import { RowLoading } from '../../shared/components/rows/RowLoading'
import { HistoryDatePicker } from './HistoryDatePicker'
import { HistoryItem } from './HistoryItem'
import { styles } from '../../shared/components/styles/shared.style'
import { METRICS, COLORS } from '../../../constants/theme'


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
        <View style={{ flex: 1, padding: METRICS.BIT, backgroundColor: COLORS.SCREEN }}>
          <Text style={{ color: COLORS.BLACK_SECONDARY }}>{title}</Text>
        </View>
      )
    }
    return null
  }

  render() {
    const { loadingEntries, historyList, fetchHistoryList } = this.props
    return (
      <Container style={styles.container}>
        <StatusBarStandard />
        <HistoryDatePicker fetchHistoryList={fetchHistoryList} />
        { loadingEntries
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
      </Container>
    )
  }
}
