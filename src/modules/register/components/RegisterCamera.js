import React, { Component } from 'react'
import { View, Platform } from 'react-native'

import { StatusBarLight } from '../../shared/components/StatusBarLight'

import { styles } from '../../home/styles/styles.home'
import { Flash } from '../../shared/components/animations/Flash'
import { Camera } from '../../shared/components/camera/Camera'
import { DarkOverlay } from '../../shared/components/overlays/DarkOverlay'
import { H5, Paragraph } from '../../shared/components/text'
import { ButtonContained } from '../../shared/components/buttons/ButtonContained'
import { RegisterFooter } from './RegisterFooter'
import { CaptureButton } from '../../home/components/CaptureButton'
import { NavBarTransparent } from '../../shared/containers/NavBarTransparent'

export class RegisterCamera extends Component {
  componentDidMount = () => {}

  state = {
    hasOverlay: true,
    imageSnap: undefined,
    isCameraReady: false,
    isTakingPicture: false,
  }

  dismissOverlay = () => {
    this.setState({ hasOverlay: false })
  }

  onCameraReady = () => this.setState({ isCameraReady: true })

  onPictureTaken = () => {
    if (Platform.OS === 'android') this.camera.pausePreview()
  }

  render() {
    const { onBackPress } = this.props
    const { isTakingPicture, hasOverlay } = this.state
    return (
      <View style={styles.container}>
        <StatusBarLight />
        <Camera
          onCameraReady={this.onCameraReady}
          onPictureTaken={this.onPictureTaken}
        />
        {hasOverlay ? (
          <React.Fragment>
            <DarkOverlay />
            <RegisterFooter
              onConfirm={this.dismissOverlay}
              onCancel={onBackPress}
            />
          </React.Fragment>
        ) : (
          <CaptureButton />
        )}
        <NavBarTransparent />
        <Flash willFlash={isTakingPicture} />
      </View>
    )
  }
}
