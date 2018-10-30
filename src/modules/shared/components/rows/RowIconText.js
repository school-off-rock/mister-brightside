import React from 'react'
import { View } from 'react-native'
import { string, func, bool } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Paragraph } from '../text/Paragraph'
import { Touchable } from '../Touchable'

import { rowStyles } from './style/row.style'
import { METRICS, COLORS } from '../../../../constants/theme'

export default function RowIconText({
  iconColor,
  iconName,
  onPress,
  text,
  textEmphasis,
}) {
  return (
    <Touchable onPress={onPress}>
      <View style={rowStyles.centerRow}>
        <View style={rowStyles.iconWrap}>
          <Icon name={iconName} color={iconColor} size={METRICS.ICONS.medium} />
        </View>
        <Paragraph emphasis={textEmphasis}>{text}</Paragraph>
      </View>
    </Touchable>
  )
}

RowIconText.propTypes = {
  iconColor: string,
  iconName: string.isRequired,
  onPress: func,
  text: string,
  textEmphasis: bool,
}
RowIconText.defaultProps = {
  iconColor: COLORS.BLACK_SECONDARY_ALT,
  onPress: () => { },
  text: '',
  textEmphasis: false,
}
