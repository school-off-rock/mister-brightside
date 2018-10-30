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

  animateTranslate = async (isVisible) => {
    const { translateY } = this.state
    if (isVisible) this.setState({ isVisible })
    await Animated.timing(
      translateY,
      {
        toValue: isVisible ? 0 : this.menuCardHeight,
        duration: 350,
        useNativeDriver: true,
      }
    ).start()
    if (!isVisible) this.setState({ isVisible })
  }

  renderOption = ({ label, iconName, onPress }) => (
    <RowIconText
      iconName={iconName}
      key={label}
      onPress={onPress}
      text={label}
      textEmphasis
    />
  )

  setOpacity = () => (
    this.state.translateY.interpolate({
      inputRange: [0, this.menuCardHeight * 0.7],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })
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
          <AnimatedBlurView
            style={[
              styles.blur,
              {
                opacity: this.setOpacity(),
                transform: [{ translateY }, { perspective: 1000 }],
              }
            ]}
          >
            <SafeAreaView forceInset={{ bottom: 'always' }}>
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
