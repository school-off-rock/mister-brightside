import React, { Component } from 'react'
import {
  Animated,
  Modal,
  StyleSheet,
  View,
} from 'react-native'

import {
  arrayOf,
  bool,
  func,
  shape,
  string,
} from 'prop-types'
import { SafeAreaView } from 'react-navigation'

import RowIconText from '../../shared/components/rows/RowIconText'
import { ViewBlurIOS } from '../../shared/components/ViewBlurIOS'

import { COLORS, METRICS } from '../../../constants/theme'

const AnimatedBlurView = Animated.createAnimatedComponent(ViewBlurIOS)
const duration = 250

export class OptionsModal extends Component {
  static propTypes = {
    isVisible: bool,
    onCancel: func.isRequired,
    options: arrayOf(shape({
      label: string,
      iconName: string,
      onPress: func,
      isDisabled: bool,
      subtitle: string,
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
        duration,
        useNativeDriver: true,
      }
    ).start(() => { if (!isVisible) { this.setState({ isVisible }) } })
  }

  renderOption = ({
    label,
    iconName,
    onPress,
    isDisabled,
    subtitle,
  }) => (
    <RowIconText
      iconName={iconName}
      iconColor={COLORS.BLACK_SECONDARY_ALT}
      key={label}
      onPress={onPress}
      text={label}
      textEmphasis
      isDisabled={isDisabled}
      subtitle={subtitle}
    />
  )

  setOpacity = () => (
    this.state.translateY.interpolate({
      inputRange: [0, this.menuCardHeight * 0.6, this.menuCardHeight],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })
  )

  render() {
    const { onCancel, options, isVisible } = this.props
    const { translateY } = this.state
    return (
      <Modal
        onRequestClose={onCancel}
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.container}>
          <AnimatedBlurView
            style={[
              styles.blur,
              {
                opacity: this.setOpacity(),
                transform: [{ translateY }, { perspective: 1000 }],
              }
            ]}
          >
            <SafeAreaView forceInset={{ top: 'never', bottom: 'always' }}>
              {options.map(this.renderOption)}
              <RowIconText
                text="Cancelar"
                iconName="close"
                onPress={onCancel}
              />
            </SafeAreaView>
          </AnimatedBlurView>
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
    backgroundColor: COLORS.SURFACE_OPACITY,
    borderTopRightRadius: METRICS.BORDER_RADIUS,
    borderTopLeftRadius: METRICS.BORDER_RADIUS,
    paddingVertical: METRICS.BIT,
    elevation: 4,
  },
})
