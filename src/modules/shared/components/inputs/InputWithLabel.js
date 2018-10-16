import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { func, string } from 'prop-types'
import { TextField } from 'react-native-material-textfield'
import { COLORS } from '../../../../constants/theme'

export class InputWithLabel extends Component {
  static propTypes = {
    onChangeText: func.isRequired,
    label: string.isRequired
  }

  state={ value: '' }

  setValue = (value) => {
    const { onChangeText } = this.props
    this.setState({ value })
    onChangeText(value)
  }

  render() {
    const { value } = this.state
    const { label } = this.props
    return (
      <View>
        <TextField
          label={label}
          value={value}
          onChangeText={this.setValue}
          tintColor={COLORS.PRIMARY}
          keyboardType="numeric"
        />
      </View>
    )
  }
}
