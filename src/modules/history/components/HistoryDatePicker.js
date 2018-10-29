import React, { Component } from 'react'
import {
  View,
  Platform,
  DatePickerAndroid,
} from 'react-native'

import { func } from 'prop-types'
import moment from 'moment'

import { DatePickerLabel } from './DatePickerLabel'
import { DateTimePickerIOS } from '../../shared/components/modals/dateTimePickerIOS'
import { Description } from '../../shared/components/text'

import { ViewBlurIOS } from '../../shared/components/ViewBlurIOS'
import { styles } from '../styles/history.styles'

const now = new Date()
export class HistoryDatePicker extends Component {
static propTypes ={
  fetchHistoryList: func.isRequired
}

  state = {
    now,
    selectedInitialDate: now,
    selectedEndDate: now,
    displayInitialDate: moment().format('DD/MM/YYYY'),
    displayEndDate: moment().format('DD/MM/YYYY'),
    isIosInitialPickerVisible: false,
    isIosEndPickerVisible: false,
  }

  showInitialPicker = () => {
    Platform.select({
      ios: () => this.setState({ isIosInitialPickerVisible: true }),
      android: async () => {
        const { selectedInitialDate, now } = this.state
        const {
          action,
          year,
          month,
          day
        } = await DatePickerAndroid.open({
          date: selectedInitialDate,
          maxDate: now,
          mode: 'spinner'
        })
        if (action !== DatePickerAndroid.dismissedAction) {
          const selectedInitialDate = new Date(year, month, day)
          this.updateInitialDate(selectedInitialDate)
          this.setSelectedInitialDate(selectedInitialDate)
        }
      }
    })()
  }

  hideInitialPicker = () => this.setState({ isIosInitialPickerVisible: false })

  updateInitialDate = (selectedInitialDate) => {
    this.setState({
      selectedInitialDate,
    })
  }

  setSelectedInitialDate = (selectedInitialDate) => {
    const { fetchHistoryList } = this.props
    const { selectedEndDate } = this.state
    const initialDate = moment(selectedInitialDate).format('YYYY-MM-DD')
    const endDate = moment(selectedEndDate).format('YYYY-MM-DD')
    this.setState({ displayInitialDate: moment(selectedInitialDate).format('DD/MM/YYYY') })
    fetchHistoryList(initialDate, endDate)
    if (Platform.OS === 'ios') this.hideInitialPicker()
  }

  showEndPicker = () => {
    Platform.select({
      ios: () => this.setState({ isIosEndPickerVisible: true }),
      android: async () => {
        const { selectedEndDate, now } = this.state
        const {
          action,
          year,
          month,
          day
        } = await DatePickerAndroid.open({
          date: selectedEndDate,
          maxDate: now,
          mode: 'spinner'
        })
        if (action !== DatePickerAndroid.dismissedAction) {
          const selectedEndDate = new Date(year, month, day)
          this.updateEndDate(selectedEndDate)
          this.setSelectedEndDate(selectedEndDate)
        }
      }
    })()
  }

  hideEndPicker = () => this.setState({ isIosEndPickerVisible: false })

  updateEndDate = (selectedEndDate) => {
    this.setState({
      selectedEndDate,
    })
  }

  setSelectedEndDate = (selectedEndDate) => {
    const { fetchHistoryList } = this.props
    const { selectedInitialDate } = this.state
    const initialDate = moment(selectedInitialDate).format('YYYY-MM-DD')
    const endDate = moment(selectedEndDate).format('YYYY-MM-DD')
    this.setState({ displayEndDate: moment(selectedEndDate).format('DD/MM/YYYY') })
    fetchHistoryList(initialDate, endDate)
    if (Platform.OS === 'ios') this.hideEndPicker()
  }

  render() {
    const {
      selectedInitialDate,
      selectedEndDate,
      isIosInitialPickerVisible,
      isIosEndPickerVisible,
      now,
      displayInitialDate,
      displayEndDate
    } = this.state
    return (
      <ViewBlurIOS style={styles.underline}>
        <View style={styles.pickerRowWrap}>
          <DatePickerLabel
            onPress={this.showInitialPicker}
            label={displayInitialDate}
          />
          <Description>até</Description>
          <DatePickerLabel
            onPress={this.showEndPicker}
            label={displayEndDate}
          />
        </View>
        {Platform.OS === 'ios' && (
          <React.Fragment>
            <DateTimePickerIOS
              date={selectedInitialDate}
              dismissButtonText="Cancelar"
              isVisible={isIosInitialPickerVisible}
              maximumDate={now}
              mode="date"
              onCancel={this.hideInitialPicker}
              onDateChange={this.updateInitialDate}
              onSubmit={() => this.setSelectedInitialDate(selectedInitialDate)}
              submitButtonText="Confirmar"
              title="Data inicial"
            />
            <DateTimePickerIOS
              date={selectedEndDate}
              dismissButtonText="Cancelar"
              isVisible={isIosEndPickerVisible}
              minimumDate={selectedInitialDate}
              mode="date"
              onCancel={this.hideEndPicker}
              onDateChange={this.updateEndDate}
              onSubmit={() => this.setSelectedEndDate(selectedEndDate)}
              submitButtonText="Confirmar"
              title="Data final"
            />
          </React.Fragment>
        )}
      </ViewBlurIOS>
    )
  }
}
