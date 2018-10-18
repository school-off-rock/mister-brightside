import React from 'react'
import { View } from 'react-native'

import { string } from 'prop-types'

import { Card } from '../../shared/components/Card'
import { Icon } from '../../shared/components/Icon'
import { Description } from '../../shared/components/text'

import { hasText } from '../../../config/functions'
import { COLORS, METRICS } from '../../../constants/theme'

import { styles } from '../../shared/components/styles/shared.style'

const itemIcon = (text, isEntrance) => (
  <View style={styles.cardFlat}>
    <View style={{
      flexDirection: 'row', alignItems: 'center'
    }}
    >
      <Description emphasis style={{ flex: 1, paddingLeft: METRICS.KILO }}>{text}</Description>
      <Icon
        color={isEntrance
          ? COLORS.SUCCESS
          : COLORS.BLACK_SECONDARY_ALT
        }
        dense
        name={isEntrance
          ? 'arrow-bottom-right-thick'
          : 'arrow-top-left-thick'
        }
      />
    </View>
  </View>
)

export const HistoryItem = (props) => {
  const { clockIn, clockOut } = props
  return (
    <View>
      { hasText(clockIn) && itemIcon(clockIn, true)}
      { hasText(clockOut) && itemIcon(clockOut, false)}
    </View>
  )
}

HistoryItem.propTypes = {
  clockIn: string,
  clockOut: string
}

HistoryItem.defaultProps = {
  clockIn: '',
  clockOut: ''
}
