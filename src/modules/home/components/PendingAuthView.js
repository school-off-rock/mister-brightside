import React from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLORS, METRICS } from '../../../constants/theme'
import { H6, Paragraph } from '../../shared/components/text'
import { CAMERA_PERMISSION_TITLE, CAMERA_PERMISSION_MESSAGE } from '../../../constants/strings'

import { styles } from '../styles/styles.home'

export const PendingAuthView = () => {
  return (
    <View style={styles.pendingWrap}>
      <Icon name="camera" color={COLORS.BLACK_SECONDARY_ALT} size={METRICS.ICONS.xxl} />
      <H6 style={styles.pendingText}>{CAMERA_PERMISSION_TITLE}</H6>
      <Paragraph style={styles.pendingText}>{CAMERA_PERMISSION_MESSAGE}</Paragraph>
    </View>
  )
}
