import React from 'react'
import { string, func } from 'prop-types'

import { Touchable } from '../../shared/components/Touchable'
import { Description } from '../../shared/components/text'


import { styles } from '../styles/history.styles'

export const DatePickerLabel = (props) => {
  const { onPress, label } = props
  return (
    <Touchable borderless onPress={onPress} style={styles.pickerSelectorLabelWrap}>
      <Description style={styles.pickerSelectorLabel}>{label}</Description>
    </Touchable>
  )
}

DatePickerLabel.propTypes = {
  onPress: func,
  label: string,
}

DatePickerLabel.defaultProps = {
  onPress: () => {},
  label: ''
}
