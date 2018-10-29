import React, { PureComponent } from 'react'
import {
  Animated, StyleSheet, View, Platform
} from 'react-native'
import {
  bool,
  string,
  shape,
  func
} from 'prop-types'

import CustomIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Touchable } from './Touchable'

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
    // const { badgeScale } = this.state
    // const { hasBadge } = this.props
    // if (hasBadge) animationTiming(badgeScale, 1)
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

  componentDidUpdate = (prevProps) => {
    const { disabled } = this.props
    if (prevProps.disabled !== disabled) {
      Animated.timing(this.state.opacity, {
        toValue: disabled ? 0.3 : 1
      }).start()
    }
  }

  setWrapStyle = () => (this.props.dense
    ? StyleSheet.flatten([styles.wrap, styles.denseWidth, { opacity: this.state.opacity }, this.props.containerStyle])
    : StyleSheet.flatten([styles.wrap, styles.standardWidth, { opacity: this.state.opacity }, this.props.containerStyle])
  )

  setIconSize = () => (this.props.dense ? METRICS.ICONS.small : METRICS.ICONS.medium)

  setBadgeOpacity = () => (
    Platform.OS === 'android'
      ? this.state.badgeScale.interpolate({
        inputRange: [0.01, 0.1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
      : 1
  )

  renderBadge = () => (
    <View style={styles.badgeContainer}>
      <Animated.View
        style={[styles.badgeCircle, {
          transform: [{ scale: this.state.badgeScale }, { perspective: 1000 }],
          opacity: this.setBadgeOpacity(),
          backgroundColor: this.props.badge.color || COLORS.PRIMARY
        }]}
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
    const {
      color,
      hasBadge,
      onPress,
      disabled,
      ...props
    } = this.props
    return (
      <AnimatedTouchable disabled={disabled} style={this.setWrapStyle()} onPress={onPress} borderless>
        <CustomIcon
          size={this.setIconSize()}
          color={color || COLORS.BLACK_SECONDARY_ALT}
          {...props}
        />
        {this.renderBadge()}
      </AnimatedTouchable>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  }
})
