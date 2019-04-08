import React, { Component } from 'react'
import { BackHandler, Image, StyleSheet } from 'react-native'

import { StatusBarLight } from '../../shared/components/StatusBarLight'

import { Flash } from '../../shared/components/animations/Flash'
import { RegisterFooter } from './RegisterFooter'
import { CaptureButton } from '../../home/components/CaptureButton'
import { NavBarTransparent } from '../../shared/containers/NavBarTransparent'
import { ViewHandlingKeyboard } from '../../shared/components/ViewHandlingKeyboard'
import { RegisterInput } from './RegisterInput'
import { CameraWithFaceDetection } from '../../shared/components/camera/CameraWithFaceDetection'

import { styles } from '../../home/styles/styles.home'
import { Values } from '../../../constants/values'
import { findPerson } from '../../../services/auth'
import {
  ERROR_USER_NOT_FOUND,
  ERROR_IMAGE_MISMATCH_IDS,
} from '../../../constants/strings'
import { MODAL } from '../../../constants/modals'

export class RegisterCamera extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    const { onBackPress } = this.props
    const { stage } = this.state
    if (stage > 1) {
      this.backToPreviousStage()
    } else {
      onBackPress() // works best when the goBack is async
    }
    return true
  }

  state = {
    imageSnap: undefined,
    isCameraReady: false,
    isTakingPicture: false,
    stage: 1,
    userID: '',
    hasFace: false,
  }

  cameraRef = React.createRef()

  goToNextStage = () => {
    this.setState(({ stage }) => ({ stage: (stage += 1) }))
  }
  backToPreviousStage = () => {
    this.setState(({ stage }) => ({
      stage: (stage -= 1),
      imageSnap: undefined,
      hasFace: false,
    }))
  }

  onCameraReady = () => this.setState({ isCameraReady: true })

  onFaceDetected = response => {
    const { faces } = response
    this.setState({ hasFace: faces && faces.length === 1 })
  }

  takePicture = async () => {
    if (this.cameraRef) {
      try {
        this.setState({ isTakingPicture: true })
        const picture = await this.cameraRef.current.takePictureAsync(
          Values.PICTURE_LOW_QUALITY
        )
        const imageSnap = picture && picture.base64 ? picture.base64 : undefined
        this.setState({ imageSnap }, this.checkUserOnPhoto)
      } catch (error) {}
    }
  }

  checkUserOnPhoto = async () => {
    const { setModal } = this.props
    const { imageSnap } = this.state
    try {
      await findPerson(imageSnap)
      this.setState({ imageSnap: undefined, isTakingPicture: false })
      setModal(MODAL.USER_ALREADY_REGISTERED)
    } catch ({ message }) {
      if (
        (message && message === ERROR_USER_NOT_FOUND) ||
        message === ERROR_IMAGE_MISMATCH_IDS
      ) {
        this.setState({ isTakingPicture: false })
        this.goToNextStage()
      } else {
        this.setState({ imageSnap: undefined, isTakingPicture: false })
        setModal(MODAL.NO_PERSON_ON_IMAGE)
      }
    }
  }

  renderStages = () => {
    const { onBackPress, onSubmitUser } = this.props
    const { stage, hasFace, isTakingPicture, imageSnap } = this.state
    switch (stage) {
      case 1:
        return (
          <RegisterFooter
            onConfirm={this.goToNextStage}
            onCancel={onBackPress}
          />
        )
      case 2:
        return (
          <CaptureButton
            onPress={this.takePicture}
            disabled={!hasFace || isTakingPicture}
            isLoading={isTakingPicture}
            hasFaceLandmarks={false}
            hasFaceClassifications={false}
          />
        )
      case 3:
        return (
          <RegisterInput onSubmit={userId => onSubmitUser(userId, imageSnap)} />
        )
      default:
        return <CaptureButton onPress={this.takePicture} />
    }
  }

  render() {
    const { isTakingPicture, imageSnap } = this.state
    return (
      <ViewHandlingKeyboard style={styles.container}>
        <StatusBarLight />
        {imageSnap && (
          <Image
            source={{ uri: `data:image/gif;base64,${imageSnap}` }}
            style={{ ...StyleSheet.absoluteFillObject }}
            fadeDuration={100}
          />
        )}
        {imageSnap === undefined && (
          <CameraWithFaceDetection
            ref={this.cameraRef}
            onCameraReady={this.onCameraReady}
            onPictureTaken={this.onPictureTaken}
            onFaceDetected={this.onFaceDetected}
          />
        )}
        {this.renderStages()}
        <NavBarTransparent />
        <Flash willFlash={isTakingPicture} />
      </ViewHandlingKeyboard>
    )
  }
}
