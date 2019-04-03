import React, { Component } from 'react'
import { View, Platform, Image, StyleSheet } from 'react-native'

import { StatusBarLight } from '../../shared/components/StatusBarLight'

import { Flash } from '../../shared/components/animations/Flash'
import { Camera } from '../../shared/components/camera/Camera'
import { DarkOverlay } from '../../shared/components/overlays/DarkOverlay'
import { RegisterFooter } from './RegisterFooter'
import { CaptureButton } from '../../home/components/CaptureButton'
import { NavBarTransparent } from '../../shared/containers/NavBarTransparent'

import { styles } from '../../home/styles/styles.home'
import { Values } from '../../../constants/values'
import { InputWithLabel } from '../../shared/components/inputs/InputWithLabel'

export class RegisterCamera extends Component {
  componentDidMount = () => {}

  state = {
    imageSnap: undefined,
    isCameraReady: false,
    isTakingPicture: false,
    stage: 2,
    userID: '',
  }

  cameraRef = React.createRef()

  goToNextStage = () => {
    this.setState(({ stage }) => ({ stage: (stage += 1) }))
  }

  setID = userID => this.setState({ userID })

  onCameraReady = () => this.setState({ isCameraReady: true })

  onPictureTaken = () => {
    if (Platform.OS === 'android') this.cameraRef.current.pausePreview()
  }

  takePicture = async () => {
    if (this.cameraRef) {
      // const { onTakePicture } = this.props
      try {
        this.onTakePicture()
        this.setState({ isTakingPicture: true })
        const picture = await this.cameraRef.current.takePictureAsync(
          Values.PICTURE_LOW_QUALITY
        )
        this.setState({
          isTakingPicture: false,
          imageSnap: picture && picture.base64 ? picture.base64 : undefined,
        })
        // await this.registerEmployee(picture)
      } catch (error) {
        // this.hideModal()
      }
    } else {
      // this.cleanPreview()
    }
  }

  renderStages = () => {
    const { onBackPress } = this.props
    const { stage } = this.state
    switch (stage) {
      case 1:
        return (
          <React.Fragment>
            <DarkOverlay />
            <RegisterFooter
              onConfirm={this.goToNextStage}
              onCancel={onBackPress}
            />
          </React.Fragment>
        )
      case 2:
        return (
          <View style={{ ...StyleSheet.absoluteFillObject, top: null }}>
            <InputWithLabel label="Seu ID" onChangeText={this.setID} />
          </View>
        )
      default:
        return <CaptureButton onPress={this.takePicture} />
    }
  }

  render() {
    const { isTakingPicture, imageSnap } = this.state
    return (
      <View style={styles.container}>
        <StatusBarLight />
        <Camera
          ref={this.cameraRef}
          onCameraReady={this.onCameraReady}
          onPictureTaken={this.onPictureTaken}
        />
        {this.renderStages()}
        {imageSnap && (
          <Image
            source={{ uri: `data:image/gif;base64,${imageSnap}` }}
            style={{ ...StyleSheet.absoluteFillObject }}
            fadeDuration={100}
          />
        )}
        <NavBarTransparent />
        <Flash willFlash={isTakingPicture} />
      </View>
    )
  }
}
