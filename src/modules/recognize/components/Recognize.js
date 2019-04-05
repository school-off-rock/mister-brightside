import React, { Component } from 'react'
import { BackHandler, Image, StyleSheet } from 'react-native'

import { StatusBarLight } from '../../shared/components/StatusBarLight'

import { Flash } from '../../shared/components/animations/Flash'
import { NavBarTransparent } from '../../shared/containers/NavBarTransparent'
import { ViewHandlingKeyboard } from '../../shared/components/ViewHandlingKeyboard'
import { CameraWithFaceDetection } from '../../shared/components/camera/CameraWithFaceDetection'

import { styles } from '../../home/styles/styles.home'
import { Values } from '../../../constants/values'
import { findPerson } from '../../../services/auth'
import { ERROR_USER_NOT_FOUND } from '../../../constants/strings'
import { MODAL } from '../../../constants/modals'
import { SmileDetectionInfo } from './SmileDetectionInfo'
import { UserConfirmationCard } from './UserConfirmationCard'
import { getFaceClassifications } from '../../../config/functions'

export class Recognize extends Component {
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
    userLabel: '',
    hasFace: false,
    smile: false,
    serious: false,
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

  resetFaceClassifications = () =>
    this.setState({ stage: 1, serious: false, smile: false, userLabel: '' })

  onFaceDetected = response => {
    const { serious, smile } = this.state
    const { faces } = response
    if (faces && faces.length === 1) {
      const [face] = faces
      const faceInfo = getFaceClassifications(face, 'SMILE')
      if (!smile && 'isSmiling' in faceInfo) {
        if (!serious && !faceInfo.isSmiling) {
          return this.setState({ serious: true })
        }
        if (serious && faceInfo.isSmiling && !smile) {
          return this.setState({ smile: true }, this.takePicture)
        }
      }
    }
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
    const { setModal, setModalCallback } = this.props
    const { imageSnap } = this.state
    try {
      const userLabel = await findPerson(imageSnap)
      this.setState({ imageSnap: undefined, isTakingPicture: false, userLabel })
      this.goToNextStage()
    } catch ({ message }) {
      if (message && message === ERROR_USER_NOT_FOUND) {
        this.setState({ isTakingPicture: false })
        setModal(MODAL.IMAGE_MISMATCH_IDS)
        setModalCallback(this.resetFaceClassifications)
      } else {
        this.setState({ imageSnap: undefined, isTakingPicture: false })
        setModal(MODAL.NO_PERSON_ON_IMAGE)
        setModalCallback(this.resetFaceClassifications)
      }
    }
  }

  renderStages = () => {
    const { onConfirmUser } = this.props
    const { stage, userLabel } = this.state
    switch (stage) {
      case 1:
        return <SmileDetectionInfo />
      case 2:
        return (
          <UserConfirmationCard
            userLabel={userLabel}
            onConfirm={() => onConfirmUser(userLabel)}
            onCancel={this.resetFaceClassifications}
          />
        )
      default:
        return <SmileDetectionInfo />
    }
  }

  render() {
    const { isTakingPicture } = this.state
    return (
      <ViewHandlingKeyboard style={styles.container}>
        <StatusBarLight />
        <CameraWithFaceDetection
          ref={this.cameraRef}
          onCameraReady={this.onCameraReady}
          onPictureTaken={this.onPictureTaken}
          onFaceDetected={this.onFaceDetected}
          hasFaceClassifications
        />
        {this.renderStages()}
        <NavBarTransparent />
        <Flash willFlash={isTakingPicture} />
      </ViewHandlingKeyboard>
    )
  }
}
