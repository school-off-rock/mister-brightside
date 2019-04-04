import React, { Component } from 'react'
import { View } from 'react-native'
import { func, string } from 'prop-types'
import { TextField } from 'react-native-material-textfield'

import { viewPropTypes } from '../../propTypes'

import { COLORS } from '../../../../constants/theme'

export class InputWithLabel extends Component {
  static propTypes = {
    onChangeText: func.isRequired,
    label: string.isRequired,
    style: viewPropTypes,
  }

  static defaultProps = {
    style: {},
  }

  state = { value: '' }

  setValue = value => {
    const { onChangeText } = this.props
    this.setState({ value })
    onChangeText(value)
  }

  render() {
    const { value } = this.state
    const { label, style, onChangeText, ...props } = this.props
    return (
      <View style={style}>
        <TextField
          label={label}
          value={value}
          onChangeText={this.setValue}
          tintColor={COLORS.PRIMARY}
          keyboardType="numeric"
          {...props}
        />
      </View>
    )
  }
}
