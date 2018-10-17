import React from 'react'
import { View } from 'react-native'
import { string, func, bool } from 'prop-types'

import { Icon } from '../Icon'
import { Paragraph } from '../text/Paragraph'
import { Touchable } from '../Touchable'

import { rowStyles } from './style/row.style'

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
        <Icon name={iconName} color={iconColor} containerStyle={rowStyles.iconWrap} />
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
  iconColor: undefined,
  onPress: () => { },
  text: '',
  textEmphasis: false,
}
