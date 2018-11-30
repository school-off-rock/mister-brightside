import React, { Component } from 'react'
import {
  View, Image, StyleSheet, Platform
} from 'react-native'

import {
  func, bool, object, oneOf
} from 'prop-types'
import { withNavigation } from 'react-navigation'

import { RNCamera } from 'react-native-camera'

import { Flash } from '../../shared/components/animations/Flash'
import { OptionsModal } from './OptionsModal'
import { PendingAuthView } from './PendingAuthView'
import { StatusBarLight } from '../../shared/components/StatusBarLight'
import { AutoShotMechanism } from './AutoShotMechanism'

import { CAMERA_PERMISSION_MESSAGE, CAMERA_PERMISSION_TITLE, IP_VALIDATION_FAIL_DESCRIPTION } from '../../../constants/strings'

import { styles } from '../styles/styles.home'
import { CaptureButton } from './CaptureButton'
import { FaceDetectionShelter } from './FaceDetectionShelter'
import { getFaceClassifications } from '../../../config/functions';

class HomeComponent extends Component {
  static propTypes = {
    onRegisterEmployee: func.isRequired,
    onHistoryPress: func.isRequired,
    onTakePicture: func.isRequired,
    clearUser: func.isRequired,
    onRegisterEmployeeEntryPress: func.isRequired,
    onTrainEmployeePhotoPress: func.isRequired,
    isSignUp: bool,
    isLoading: bool,
    hasAutoShot: bool,
    navigation: object.isRequired,
    ipStatus: oneOf(['NOT_SET', 'VALID', 'INVALID']).isRequired
  }

  static defaultProps = {
    isSignUp: false,
    isLoading: false,
    hasAutoShot: true
  }

  face = undefined

  state = {
    imageSnap: undefined,
    isCameraReady: false,
    isTakingPicture: false,
    modalVisible: false,
    hasAutoShot: this.props.hasAutoShot,
    isFirstView: true,

    hasFaceDetection: true, // fixMe
    face: {},
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const focusType = Platform.OS === 'ios' ? 'willFocus' : 'didFocus'
    const blurType = Platform.OS === 'ios' ? 'willBlur' : 'didBlur'
    this.focusSubscription = navigation.addListener(focusType, this.onFocus)
    this.blurSubscription = navigation.addListener(blurType, () => this.setState({ hasAutoShot: false }))
  }

  onFocus = () => {
    const { isSignUp } = this.props
    this.setState(({ isFirstView }) => ({
      hasAutoShot: isSignUp || isFirstView,
      isFirstView: false
    }))
    this.props.clearUser()
  }

  hideModal = () => {
    this.setState({ modalVisible: false, imageSnap: undefined })
    if (Platform.OS === 'android') this.camera.resumePreview()
  }

  onCancelOptionsModal = () => {
    this.hideModal()
    this.props.clearUser()
  }

  onCameraReady = () => this.setState({ isCameraReady: true })

  onFaceDetected = (response) => {
    const { faces } = response
    if (faces && faces.length > 0) {
      const [face] = faces
      const classifications = getFaceClassifications(face)
      console.log(classifications)
      // this.setState({ face })
    }
  }

  navigateToHistory = () => {
    const { onHistoryPress } = this.props
    this.hideModal()
    onHistoryPress()
  }

  registerEmployeeEntry = async () => {
    const { onRegisterEmployeeEntryPress, clearUser } = this.props
    this.hideModal()
    await onRegisterEmployeeEntryPress()
    clearUser()
  }

  trainEmployeePhoto = async () => {
    const { onTrainEmployeePhotoPress, clearUser } = this.props
    const { imageB64 } = this.state
    this.hideModal()
    await onTrainEmployeePhotoPress(imageB64)
    clearUser()
  }

  showOptionsModal = (image) => {
    this.setState({
      imageB64: image.base64,
      modalVisible: true,
      isTakingPicture: false
    })
  }

  registerEmployee = async (image) => {
    const { onRegisterEmployee } = this.props
    try {
      await onRegisterEmployee(image.base64)
      this.showOptionsModal(image)
    } catch (error) {
      this.cleanPreview()
    }
  }

  onAutoShot = () => {
    this.setState({ hasAutoShot: false })
    this.takePicture()
  }

  takePicture = async () => {
    if (this.camera) {
      const { onTakePicture } = this.props
      const options = {
        quality: 0.2,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
        mirrorImage: true,
        doNotSave: true,
        width: 720
      }
      try {
        onTakePicture()
        this.setState({ isTakingPicture: true })
        const data = await this.camera.takePictureAsync(options)
        this.setState({
          isTakingPicture: false,
          imageSnap: data && data.base64 ? data.base64 : undefined
        })
        await this.registerEmployee(data)
      } catch (error) {
        this.hideModal()
      }
    } else {
      this.cleanPreview()
    }
  }

  onPictureTaken = () => {
    if (Platform.OS === 'android') this.camera.pausePreview()
  }

  cleanPreview = () => {
    if (Platform.OS === 'android') this.camera.resumePreview()
    this.setState({ imageSnap: undefined })
  }

  renderFooter = () => {
    const { isTakingPicture, hasAutoShot, hasFaceDetection } = this.state
    const { isLoading } = this.props
    const isDisabled = isTakingPicture

    if (hasFaceDetection) return <FaceDetectionShelter isSmiling={this.state.isSmiling} {...this.state.face} />
    if (hasAutoShot) return <AutoShotMechanism onTimerEnd={this.onAutoShot} />
    return <CaptureButton onPress={this.takePicture} disabled={isDisabled} isLoading={isTakingPicture || isLoading} />
  }

  render() {
    const { ipStatus } = this.props
    const {
      modalVisible, isTakingPicture, isCameraReady, imageSnap
    } = this.state
    const ipIsNotValid = ipStatus !== 'VALID'
    const modalOptions = [
      {
        label: 'Bater ponto',
        iconName: 'map-marker-radius',
        onPress: this.registerEmployeeEntry,
        isDisabled: ipIsNotValid,
        subtitle: ipIsNotValid ? IP_VALIDATION_FAIL_DESCRIPTION : ''
      },
      {
        label: 'Ver histórico',
        iconName: 'clock-outline',
        onPress: this.navigateToHistory
      },
      {
        label: 'Melhorar identificação',
        iconName: 'creation',
        onPress: this.trainEmployeePhoto,
        isDisabled: ipIsNotValid,
        subtitle: ipIsNotValid ? IP_VALIDATION_FAIL_DESCRIPTION : ''
      }
    ]
    return (
      <View style={styles.container}>
        <StatusBarLight />
        <View style={styles.preview}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            permissionDialogTitle={CAMERA_PERMISSION_TITLE}
            permissionDialogMessage={CAMERA_PERMISSION_MESSAGE}
            notAuthorizedView={<PendingAuthView />}
            // pendingAuthorizationView={<PendingAuthView />}
            onCameraReady={this.onCameraReady}
            onPictureTaken={this.onPictureTaken}
            onFacesDetected={this.onFaceDetected}
            onFaceDetectionError={e => console.log('ERROR', e)}
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
            faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.none}
            faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
          />
          {(Platform.OS === 'android' || imageSnap) && <Image source={{ uri: `data:image/gif;base64,${imageSnap}` }} style={{ ...StyleSheet.absoluteFillObject }} fadeDuration={100} />}
        </View>
        {isCameraReady && !modalVisible && this.renderFooter()}
        <Flash willFlash={isTakingPicture} />
        <OptionsModal isVisible={modalVisible} onCancel={this.onCancelOptionsModal} onHistoryPress={this.navigateToHistory} options={modalOptions} />
      </View>
    )
  }
}

export const Home = withNavigation(HomeComponent)
