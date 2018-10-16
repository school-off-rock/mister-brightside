import React, { Component } from 'react'
import {
  Modal,
  View,
  Text
} from 'react-native'

import { func, bool, string } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { hasText } from '../../../../config/functions'
import { Card } from '../Card'
import { ButtonText } from '../buttons/ButtonText'
import { COLORS, METRICS } from '../../../../constants/theme'
import { styles } from './styles/modal.style'

export class ModalWithIcon extends Component {
  state ={}

  static propTypes = {
    onCancel: func.isRequired,
    onClose: func.isRequired,
    isVisible: bool,
    title: string,
    description: string,
    buttonLabel: string,
    primaryColor: string,
    iconName: string,
  }

  static defaultProps = {
    isVisible: false,
    title: '',
    description: '',
    buttonLabel: '',
    primaryColor: COLORS.PRIMARY,
    iconName: 'help'
  }

  render() {
    const {
      isVisible,
      onCancel,
      onClose,
      title,
      description,
      buttonLabel,
      primaryColor,
      iconName
    } = this.props

    return (
      <Modal onRequestClose={onCancel} animationType="slide" transparent={true} visible={isVisible}>
        <Card style={styles.container}>
          <View style={styles.blur}>
            <Icon name={iconName} style={styles.icon} color={primaryColor} size={METRICS.ICONS.xl} />
            { hasText(title) && <Text style={styles.title}>{title}</Text> }
            { hasText(description) && <Text style={styles.description}>{description}</Text> }
            <View style={styles.buttonContainer}>
              <ButtonText
                onPress={onClose}
                contentStyle={[{ color: primaryColor }, styles.buttonContainer]}
                title={buttonLabel}
              />
            </View>
          </View>
        </Card>
      </Modal>
    )
  }
}
