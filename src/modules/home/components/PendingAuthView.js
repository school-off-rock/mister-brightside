import React from 'react'
import { View } from 'react-native'

import { styles } from '../styles/styles.home'
import { H6, Paragraph } from '../../shared/components/text'
import { CAMERA_PERMISSION_TITLE, CAMERA_PERMISSION_MESSAGE } from '../../../constants/strings'

export const PendingAuthView = () => {
  return (
    <View style={styles.pendingWrap}>
      <H6>{CAMERA_PERMISSION_TITLE}</H6>
      <Paragraph style={styles.pendingText}>{CAMERA_PERMISSION_MESSAGE}</Paragraph>
    </View>
  )
}
