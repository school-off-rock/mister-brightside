import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native'

import { func, bool, object } from 'prop-types'
import { withNavigation } from 'react-navigation'

import { RNCamera } from 'react-native-camera'

import { Flash } from '../../shared/components/animations/Flash'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { OptionsModal } from './OptionsModal'
import { PendingAuthView } from './PendingAuthView'
import { StatusBarLight } from '../../shared/components/StatusBarLight'
import { AutoShotMechanism } from './AutoShotMechanism'

import { CAMERA_PERMISSION_MESSAGE, CAMERA_PERMISSION_TITLE } from '../../../constants/strings'

import { styles } from '../styles/styles.home'

class HomeComponent extends Component {
  static propTypes = {
    onRegisterEmployee: func.isRequired,
    onHistoryPress: func.isRequired,
    onTakePicture: func.isRequired,
    onRegisterEmployeeEntryPress: func.isRequired,
    onTrainEmployeePhotoPress: func.isRequired,
    isSignUp: bool,
    isLoading: bool,
    hasAutoShot: bool,
    navigation: object.isRequired,
  }

  static defaultProps = {
    isSignUp: false,
    isLoading: false,
    hasAutoShot: true,
  }

  state = {
    imageSnap: undefined,
    isCameraReady: false,
    isTakingPicture: false,
    modalVisible: false,
    hasAutoShot: this.props.hasAutoShot,
    isFirstView: true,
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const focusType = Platform.OS === 'ios' ? 'willFocus' : 'didFocus'
    const blurType = Platform.OS === 'ios' ? 'willBlur' : 'didBlur'
    this.focusSubscription = navigation.addListener(focusType, this.onFocus)
    this.blurSubscription = navigation.addListener(
      blurType,
      () => this.setState({ hasAutoShot: false })
    )
  }

  onFocus = () => {
    const { isSignUp } = this.props
    this.setState(({ isFirstView }) => ({
      hasAutoShot: (isSignUp || isFirstView),
      isFirstView: false
    }))
  }

  hideModal = () => {
    this.setState({ modalVisible: false, imageSnap: undefined })
    if (Platform.OS === 'android') this.camera.resumePreview()
  }

  onCameraReady = () => this.setState({ isCameraReady: true })

  navigateToHistory = () => {
    const { onHistoryPress } = this.props
    this.hideModal()
    onHistoryPress()
  }

  registerEmployeeEntry = () => {
    const { onRegisterEmployeeEntryPress } = this.props
    this.hideModal()
    onRegisterEmployeeEntryPress()
  }

  trainEmployeePhoto = async () => {
    const { onTrainEmployeePhotoPress } = this.props
    const { imageB64 } = this.state
    this.hideModal()
    await onTrainEmployeePhotoPress(imageB64)
  }

  showOptionsModal = (image) => {
    this.setState({
      imageB64: image.base64,
      modalVisible: true,
      isTakingPicture: false
    })
  }

  registerEmployee = async (image) => {
    const { onRegisterEmployee, navigation } = this.props
    try {
      await onRegisterEmployee(image.base64)
      navigation.setParams({ signUp: false })
      this.showOptionsModal(image)
    } catch (error) {

      this.cleanPreview()
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const { verifyEmployeePhoto, isSignUp, onTakePicture } = this.props
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
        mirrorImage: true,
        doNotSave: true,
      }
      try {
        onTakePicture()
        this.setState({ isTakingPicture: true, hasAutoShot: false })
        const data = await this.camera.takePictureAsync(options)
        this.setState({
          isTakingPicture: false,
          imageSnap: (data && data.base64) ? data.base64 : undefined,
        })
        if (!isSignUp) {
          await verifyEmployeePhoto(data.base64)
          this.showOptionsModal(data)
        } else {
          this.registerEmployee(data)
        }
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
    const { isTakingPicture } = this.state
    const { isLoading } = this.props

    return this.state.hasAutoShot
      ? <AutoShotMechanism onTimerEnd={() => this.takePicture(this.camera)} />
      : (
        <View style={styles.bottomOverlay}>
          <View style={styles.captureWrap}>
            <TouchableOpacity
              style={styles.capture}
              onPress={() => this.takePicture(this.camera)}
              disabled={isTakingPicture}
            >
              {(isTakingPicture || isLoading) && <View style={styles.absoluteCentered}><LoadingSpinner /></View>}
            </TouchableOpacity>
          </View>
        </View>
      )
  }

  render() {
    const {
      modalVisible,
      isTakingPicture,
      isCameraReady,
      imageSnap,
    } = this.state
    const modalOptions = [
      {
        label: 'Bater ponto',
        iconName: 'map-marker-radius',
        onPress: this.registerEmployeeEntry
      },
      {
        label: 'Ver histórico',
        iconName: 'clock-outline',
        onPress: this.navigateToHistory
      },
      {
        label: 'Melhorar identificação',
        iconName: 'creation',
        onPress: this.trainEmployeePhoto
      },
    ]
    return (
      <View style={styles.container}>
        <StatusBarLight />
        <View style={styles.preview}>
          <RNCamera
            ref={(ref) => { this.camera = ref }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            permissionDialogTitle={CAMERA_PERMISSION_TITLE}
            permissionDialogMessage={CAMERA_PERMISSION_MESSAGE}
            notAuthorizedView={<PendingAuthView />}
            // pendingAuthorizationView={<PendingAuthView />}
            onCameraReady={this.onCameraReady}
            onPictureTaken={this.onPictureTaken}
          />
          {(Platform.OS === 'android' || imageSnap) && (
            <Image
              source={{ uri: `data:image/gif;base64,${imageSnap}` }}
              style={{ ...StyleSheet.absoluteFillObject }}
              fadeDuration={100}
            />
          )}
        </View>
        {isCameraReady && !modalVisible && this.renderFooter()}
        <Flash willFlash={isTakingPicture} />
        <OptionsModal
          isVisible={modalVisible}
          onCancel={this.hideModal}
          onHistoryPress={this.navigateToHistory}
          options={modalOptions}
        />
      </View>
    )
  }
}

export const Home = withNavigation(HomeComponent)
