import React from 'react'
import { View, Text } from 'react-native'
import { string } from 'prop-types'
import { hasText } from '../../../config/functions'
import { Card } from '../../shared/components/Card'
import { Icon } from '../../shared/components/Icon'
import { COLORS, METRICS } from '../../../constants/theme'
import { styles } from '../../shared/components/styles/shared.style'

const itemIcon = (text, icon) => (
  <Card style={styles.card}>
    <View style={{
      flexDirection: 'row', alignItems: 'center'
    }}
    >
      <Text style={{ flex: 1, paddingLeft: METRICS.BYTE }}>{text}</Text>
      <Icon
        color={COLORS.BLACK_SECONDARY}
        dense
        name={icon}
      />
    </View>
  </Card>
)

export const HistoryItem = (props) => {
  const { clockIn, clockOut } = props
  return (
    <View>
      { hasText(clockIn) && itemIcon(clockIn, 'arrow-top-left-bold-outline')}
      { hasText(clockOut) && itemIcon(clockOut, 'arrow-bottom-right-bold-outline')}
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
