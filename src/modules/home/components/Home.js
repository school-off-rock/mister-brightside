import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import { func, bool } from 'prop-types'

import { RNCamera } from 'react-native-camera'

import { Flash } from '../../shared/components/animations/Flash'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { OptionsModal } from './OptionsModal'
import { PendingAuthView } from './PendingAuthView'
import { StatusBarLight } from '../../shared/components/StatusBarLight'

import { CAMERA_PERMISSION_MESSAGE, CAMERA_PERMISSION_TITLE } from '../../../constants/strings'

import { styles } from '../styles/styles.home'

export class Home extends Component {
  static propTypes = {
    registerEmployee: func.isRequired,
    onHistoryPress: func.isRequired,
    onRegisterEmployeeEntryPress: func.isRequired,
    onTrainEmployeePhotoPress: func.isRequired,
    isSignUp: bool,
    isLoading: bool,
  }

  static defaultProps = {
    isSignUp: false,
    isLoading: false,
  }

  state = {
    imageSnap: undefined,
    isCameraReady: false,
    isTakingPicture: false,
    modalVisible: false,
  }

  hideModal = () => this.setState({ modalVisible: false, imageSnap: undefined })

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
      imageSnap: image.uri,
      modalVisible: true,
      isTakingPicture: false
    })
  }

  registerEmployee = async (image) => {
    const { registerEmployee } = this.props
    try {
      await registerEmployee(image.base64)
      this.showOptionsModal(image)
    } catch (error) {
      this.setState({ isTakingPicture: false })
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const { isSignUp, verifyEmployeePhoto } = this.props
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
        mirrorImage: true,
      }
      try {
        this.setState({ isTakingPicture: true })
        const data = await this.camera.takePictureAsync(options)
        this.setState({ isTakingPicture: false })
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
      this.setState({ imageSnap: undefined })
    }
  }

  render() {
    const {
      imageSnap,
      modalVisible,
      isTakingPicture,
      isCameraReady,
    } = this.state
    const { isLoading, isLoadingClockIn } = this.props
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
        {imageSnap
          ? <Image source={{ uri: imageSnap }} style={styles.preview} fadeDuration={0} />
          : (
            <View style={styles.preview}>
              <RNCamera
                ref={(ref) => { this.camera = ref }}
                style={styles.preview}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={CAMERA_PERMISSION_TITLE}
                permissionDialogMessage={CAMERA_PERMISSION_MESSAGE}
                notAuthorizedView={<PendingAuthView />}
                // pendingAuthorizationView={<PendingAuthView />}
                onCameraReady={this.onCameraReady}
              />
              {
                isCameraReady
                && (
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
              <Flash willFlash={isTakingPicture} />
            </View>
          )
        }
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
