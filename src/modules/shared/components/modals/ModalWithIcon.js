import React, { Component } from 'react'
import {
  Modal,
  View,
  Text
} from 'react-native'

import { func, bool, string } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { ButtonText } from '../buttons/ButtonText'
import { ViewBlurDark } from '../ViewBlurDark'

import { hasText } from '../../../../config/functions'
import { COLORS, METRICS } from '../../../../constants/theme'

import { styles } from './styles/modal.style'

export class ModalWithIcon extends Component {
  state ={}

  static propTypes = {
    onAction: func,
    onCancel: func.isRequired,
    onClose: func.isRequired,
    isVisible: bool,
    title: string,
    description: string,
    actionButtonLabel: string,
    closeButtonLabel: string,
    primaryColor: string,
    iconName: string,
  }

  static defaultProps = {
    onAction: () => {},
    isVisible: false,
    title: '',
    description: '',
    actionButtonLabel: undefined,
    closeButtonLabel: '',
    primaryColor: COLORS.PRIMARY,
    iconName: 'help'
  }

  render() {
    const {
      isVisible,
      onAction,
      onCancel,
      onClose,
      title,
      description,
      actionButtonLabel,
      closeButtonLabel,
      primaryColor,
      iconName
    } = this.props

    return (
      <Modal onRequestClose={onCancel} animationType="fade" transparent={true} visible={isVisible}>
        <ViewBlurDark style={styles.container}>
          <View style={styles.blur}>
            <Icon name={iconName} style={styles.icon} color={primaryColor} size={METRICS.ICONS.xl} />
            { hasText(title) && <Text style={styles.title}>{title}</Text> }
            { hasText(description) && <Text style={styles.description}>{description}</Text> }
            <View style={styles.buttonContainer}>
              <ButtonText
                onPress={onClose}
                contentStyle={[{ color: primaryColor }, styles.button]}
                title={closeButtonLabel}
              />
              { hasText(actionButtonLabel)
                && (
                <ButtonText
                  onPress={onAction}
                  contentStyle={[{ color: primaryColor }, styles.button]}
                  title={actionButtonLabel}
                />
                )
              }
            </View>
          </View>
        </ViewBlurDark>
      </Modal>
    )
  }
}
