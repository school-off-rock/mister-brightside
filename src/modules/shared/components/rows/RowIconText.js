import React from 'react'
import { View } from 'react-native'
import { string, func, bool } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Paragraph, Caption } from '../text'
import { Touchable } from '../Touchable'

import { rowStyles } from './style/row.style'
import { METRICS, COLORS } from '../../../../constants/theme'
import { hasText } from '../../../../config/functions'

export default function RowIconText({
  iconColor,
  iconName,
  onPress,
  text,
  textEmphasis,
  isDisabled,
  subtitle,
}) {
  return (
    <Touchable
      onPress={onPress}
      disabled={isDisabled}
      style={{ opacity: isDisabled ? 0.26 : 1 }}
    >
      <View style={rowStyles.centerRow}>
        <View style={rowStyles.iconWrap}>
          <Icon name={iconName} color={iconColor} size={METRICS.ICONS.medium} />
        </View>
        <View style={{ flex: 1 }}>
          <Paragraph emphasis={textEmphasis}>{text}</Paragraph>
          {hasText(subtitle) && <Caption>{subtitle}</Caption>}
        </View>
      </View>
    </Touchable>
  )
}

RowIconText.propTypes = {
  iconColor: string,
  iconName: string.isRequired,
  onPress: func,
  text: string,
  subtitle: string,
  textEmphasis: bool,
  isDisabled: bool,
}
RowIconText.defaultProps = {
  iconColor: COLORS.BLACK_SECONDARY_ALT,
  onPress: () => { },
  text: '',
  subtitle: undefined,
  textEmphasis: false,
  isDisabled: false,
}
