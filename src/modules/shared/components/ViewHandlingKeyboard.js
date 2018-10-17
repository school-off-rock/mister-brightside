import React, { PureComponent } from 'react'
import {
  Keyboard,
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native'
import { func, node } from 'prop-types'
import { ViewDismissKeyboard } from './ViewDismissKeyboard'

export class ViewHandlingKeyboard extends PureComponent {
  static defaultProps = {
    children: null,
    onKeyboardHide: () => {},
    onKeyboardShow: () => {},
    style: {},
  }

  static propTypes = {
    children: node,
    onKeyboardHide: func,
    onKeyboardShow: func,
    style: ViewPropTypes.style,
  }

  state={ height: 0 }

  componentDidMount = () => (
    Platform.select({
      ios: () => {
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
      },
      android: () => {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
      }
    })()
  )

  componentWillUnmount = () => (
    Platform.select({
      ios: () => {
        this.keyboardWillShow.remove()
        this.keyboardWillHide.remove()
      },
      android: () => {
        this.keyboardDidShow.remove()
        this.keyboardDidHide.remove()
      }
    })()
  )

  keyboardWillShow = ({ endCoordinates: { height } }) => {
    const { onKeyboardShow } = this.props
    onKeyboardShow()
    this.setState({ height })
  }

  keyboardWillHide = () => {
    const { onKeyboardHide } = this.props
    onKeyboardHide()
    this.setState({ height: 0 })
  }

  keyboardDidShow = () => this.props.onKeyboardShow()

  keyboardDidHide = () => this.props.onKeyboardHide()

  render() {
    const { height } = this.state
    const { style, ...rest } = this.props
    return (
      <ViewDismissKeyboard style={StyleSheet.flatten([style, { paddingBottom: height }])} {...rest}>
        {this.props.children}
      </ViewDismissKeyboard>
    )
  }
}
