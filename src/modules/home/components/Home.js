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
    isSignUp: bool
  }

  static defaultProps = {
    isSignUp: false
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
    } catch (error) {}

  }

  takePicture = async () => {
    if (this.camera) {
      const { isSignUp } = this.props
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
        mirrorImage: true,
      }
      this.setState({ isTakingPicture: true })
      const data = await this.camera.takePictureAsync(options)
      if (!isSignUp) {
        this.showOptionsModal(data)
      } else {
        this.registerEmployee(data)
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
    const modalOptions = [
      {
        label: 'Bater ponto',
        iconName: 'map-marker-radius',
        onPress: () => console.warn('Bater ponto')
      },
      {
        label: 'Ver histórico',
        iconName: 'clock-outline',
        onPress: this.navigateToHistory
      },
      {
        label: 'Melhorar identificação',
        iconName: 'creation',
        onPress: () => console.warn('Melhorar identificação')
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
                        {isTakingPicture && <View style={styles.absoluteCentered}><LoadingSpinner /></View>}
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
