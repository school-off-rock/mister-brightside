import React, { PureComponent } from 'react'
import { Animated, StyleSheet, View, Platform } from 'react-native'
import { bool, string, shape, func } from 'prop-types'

import CustomIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Touchable from 'react-native-platform-touchable'

import { METRICS, COLORS } from '../../../constants/theme'
import { viewPropTypes } from '../propTypes'

// import { animationTiming } from './animations'

const MIN_SCALE_VALUE = Platform.OS === 'android' ? 0.01 : 0
const AnimatedTouchable = Animated.createAnimatedComponent(Touchable)

export class Icon extends PureComponent {
  static defaultProps = {
    color: undefined,
    containerStyle: {},
    dense: false,
    disabled: false,
    hasBadge: false,
    badge: { name: 'check', color: COLORS.PRIMARY },
    onPress: () => {},
  }

  static propTypes = {
    color: string,
    containerStyle: viewPropTypes,
    dense: bool,
    disabled: bool,
    hasBadge: bool,
    badge: shape({ name: string, color: string }),
    onPress: func,
  }

  state = {
    badgeScale: new Animated.Value(MIN_SCALE_VALUE),
    opacity: new Animated.Value(1),
  }

  componentDidMount = () => {
    const { disabled } = this.props
    if (disabled) {
      this.setOpacity(disabled)
    }
  }

  componentDidUpdate = () => {
    // const { hasBadge } = this.props
    // const { badgeScale } = this.state
    // if (hasBadge !== prevProps.hasBadge) {
    //   animationTiming(
    //     badgeScale,
    //     hasBadge ? 1 : MIN_SCALE_VALUE,
    //     { isLeaving: !hasBadge, duration: 'fast' }
    //   )
    // }
  }

  componentDidUpdate = prevProps => {
    const { disabled } = this.props
    if (prevProps.disabled !== disabled) {
      this.setOpacity(disabled)
    }
  }

  setOpacity = isDisabled => {
    Animated.timing(this.state.opacity, {
      toValue: isDisabled ? 0.2 : 1,
    }).start()
  }

  setWrapStyle = () => {
    const staticOpacity = this.props.disabled ? 0.2 : 1
    const opacityToUse =
      Platform.OS === 'ios' ? staticOpacity : this.state.opacity
    return this.props.dense
      ? StyleSheet.flatten([
          styles.wrap,
          styles.denseWidth,
          { opacity: opacityToUse },
          this.props.containerStyle,
        ])
      : StyleSheet.flatten([
          styles.wrap,
          styles.standardWidth,
          { opacity: opacityToUse },
          this.props.containerStyle,
        ])
  }

  setIconSize = () =>
    this.props.dense ? METRICS.ICONS.small : METRICS.ICONS.medium

  setBadgeOpacity = () =>
    Platform.OS === 'android'
      ? this.state.badgeScale.interpolate({
          inputRange: [0.01, 0.1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 1

  renderBadge = () => (
    <View style={styles.badgeContainer}>
      <Animated.View
        style={[
          styles.badgeCircle,
          {
            transform: [
              { scale: this.state.badgeScale },
              { perspective: 1000 },
            ],
            opacity: this.setBadgeOpacity(),
            backgroundColor: this.props.badge.color || COLORS.PRIMARY,
          },
        ]}
      >
        <CustomIcon
          size={10}
          name={this.props.badge.name || 'check'}
          color="white"
        />
      </Animated.View>
    </View>
  )

  render() {
    const { color, hasBadge, onPress, disabled, ...props } = this.props
    return (
      <AnimatedTouchable
        disabled={disabled}
        style={this.setWrapStyle()}
        onPress={onPress}
        background={Touchable.SelectableBackgroundBorderless()}
      >
        <View>
          <CustomIcon
            size={this.setIconSize()}
            color={color || COLORS.BLACK_SECONDARY_ALT}
            {...props}
          />
          {this.renderBadge()}
        </View>
      </AnimatedTouchable>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  standardWidth: {
    width: METRICS.ICON_TOUCHABLE_AREA,
  },
  denseWidth: {
    width: METRICS.ICON_TOUCHABLE_AREA_DENSE,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: METRICS.BIT,
    right: METRICS.BIT,
    alignItems: 'center',
    justifyContent: 'center',
    width: METRICS.KILO,
    aspectRatio: METRICS.RATIO.square,
  },
  badgeCircle: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: METRICS.BORDER_WIDTH,
    borderColor: 'white',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: METRICS.BIT,
  },
})
