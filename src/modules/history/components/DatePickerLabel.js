import React from 'react'
import { View, Text } from 'react-native'
import { string, func } from 'prop-types'
import { Touchable } from '../../shared/components/Touchable'

export const DatePickerLabel = (props) => {
  const { onPress, label } = props
  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center'
    }}
    >
      <Touchable borderless onPress={onPress}><Text>{label}</Text></Touchable>
    </View>
  )
}

DatePickerLabel.propTypes = {
  onPress: func,
  label: string,
}

DatePickerLabel.defaultProps = {
  onPress: () => {},
  label: 'até'
}
