import React, { Component } from 'react'
import {
  DatePickerIOS,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import PropTypes from 'prop-types'
import { BlurView } from 'react-native-blur'

import { Divider } from '../Divider'
import { ButtonText } from '../buttons'

import { COLORS } from '../../../../constants/theme/colors'

export class DateTimePickerIOS extends Component {

  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    dismissButtonText: PropTypes.string,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    isVisible: PropTypes.bool,
    mode: PropTypes.string,
    onCancel: PropTypes.func,
    onDateChange: PropTypes.func,
    onSubmit: PropTypes.func,
    submitButtonText: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    dismissButtonText: 'Cancelar',
    maximumDate: undefined,
    minimumDate: undefined,
    isVisible: false,
    mode: 'date',
    onCancel: () => { },
    onDateChange: () => { },
    onSubmit: () => { },
    submitButtonText: 'Selecionar',
    title: '',
  }

  renderTitle = () => {
    const { title } = this.props
    if (title !== '') {
      return (
        <View>
          <Text style={styles.title}>{title}</Text>
          <Divider noMargin />
        </View>
      )
    }
    return null
  }

  render() {
    const {
      date,
      dismissButtonText,
      maximumDate,
      minimumDate,
      isVisible,
      mode,
      onCancel,
      onDateChange,
      onSubmit,
      submitButtonText,
    } = this.props

    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.container}>
            <BlurView viewRef={null} blurType="light" style={styles.blur}>
              {this.renderTitle()}

              <DatePickerIOS
                locale="pt-br"
                date={date}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                mode={mode}
                onDateChange={onDateChange}
              />

              <Divider noMargin />
              <View style={styles.row}>
                <ButtonText
                  color={COLORS.BLACK_SECONDARY_ALT}
                  containerStyle={styles.buttonContainer}
                  contentStyle={styles.button}
                  onPress={onCancel}
                  title={dismissButtonText}
                />
                <ButtonText
                  color={COLORS.PRIMARY}
                  containerStyle={styles.buttonContainer}
                  contentStyle={styles.button}
                  onPress={onSubmit}
                  title={submitButtonText}
                />
              </View>

            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DARK_OVERLAY,
    flex: 1,
    justifyContent: 'flex-end',
  },
  blur: {
    backgroundColor: COLORS.WHITE_SECONDARY
  },
  title: {
    color: COLORS.BLACK_SECONDARY_ALT,
    fontSize: 17,
    padding: 16,
  },
  row: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 48,
    lineHeight: 48,
  }
})
