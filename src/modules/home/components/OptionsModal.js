import React, { Component } from 'react'
import {
  Animated,
  Modal,
  StyleSheet,
  View,
} from 'react-native'

import {
  arrayOf,
  func,
  bool,
  string,
  shape,
} from 'prop-types'

import { COLORS, METRICS } from '../../../constants/theme'
import RowIconText from '../../shared/components/rows/RowIconText'

export class OptionsModal extends Component {
  static propTypes = {
    isVisible: bool,
    onCancel: func.isRequired,
    options: arrayOf(shape({
      label: string,
      iconName: string,
      onPress: func,
    })).isRequired
  }

  static defaultProps = {
    isVisible: false,
  }

  constructor(props) {
    super(props)

    this.menuCardHeight = ((props.options.length + 1) * METRICS.ICON_TOUCHABLE_AREA) + METRICS.KILO

    this.state = {
      translateY: new Animated.Value(this.menuCardHeight),
      isVisible: false
    }
  }

  componentDidUpdate = (prevProps) => {
    const { isVisible } = this.props
    if (prevProps.isVisible !== isVisible) {
      this.animateTranslate(isVisible)
    }
  }

  animateTranslate = (isVisible) => {
    const { translateY } = this.state
    if (isVisible) this.setState({ isVisible })
    Animated.timing(
      translateY,
      {
        toValue: isVisible ? 0 : this.menuCardHeight,
        useNativeDriver: true,
        duration: 300,
      }
    ).start(() => { if (!isVisible) this.setState({ isVisible }) })
  }

  renderOption = ({ label, iconName, onPress }) => (
    <RowIconText
      iconColor={COLORS.BLACK_PRIMARY_ALT}
      iconName={iconName}
      key={label}
      onPress={onPress}
      text={label}
      textEmphasis
    />
  )

  render() {
    const { onCancel, options } = this.props
    const { isVisible, translateY } = this.state
    return (
      <Modal
        onRequestClose={onCancel}
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.blur,
              { transform: [{ translateY }, { perspective: 1000 }] }
            ]}
          >
            {options.map(this.renderOption)}
            <RowIconText
              text="Cancelar"
              iconName="close"
              onPress={onCancel}
            />
          </Animated.View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blur: {
    backgroundColor: COLORS.WHITE,
    borderTopRightRadius: METRICS.BORDER_RADIUS,
    borderTopLeftRadius: METRICS.BORDER_RADIUS,
    paddingVertical: METRICS.BIT,
  },
})
