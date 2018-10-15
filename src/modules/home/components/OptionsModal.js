import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  View,
} from 'react-native'

import { func, bool } from 'prop-types'

import { ButtonText } from '../../shared/components/buttons'
import { Card } from '../../shared/components/Card'
import { COLORS } from '../../../constants/theme/colors'

export class OptionsModal extends Component {
  state ={}

  static propTypes = {
    isVisible: bool,
    onCancel: func.isRequired,
    onHistoryPress: func.isRequired,
  }

  static defaultProps = {
    isVisible: false,
  }

  render() {
    const {
      isVisible,
      onCancel,
      onHistoryPress
    } = this.props

    return (
      <Modal onRequestClose={onCancel} animationType="slide" transparent={true} visible={isVisible}>
        <Card style={styles.container}>
          <View style={styles.blur}>
            <ButtonText
              color={COLORS.BLACK_SECONDARY_ALT}
              containerStyle={styles.buttonContainer}
              contentStyle={styles.button}
              onPress={onHistoryPress}
              title="Ver histórico"
            />
          </View>
        </Card>
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
    backgroundColor: COLORS.WHITE_SECONDARY,
    flex: 0.4,
    borderRadius: 12,
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
    justifyContent: 'center',
  },
  button: {
    height: 48,
    lineHeight: 48,
  }
})
