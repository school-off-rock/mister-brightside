import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import { func } from 'prop-types'

import { RNCamera } from 'react-native-camera'

import { OptionsModal } from './OptionsModal'
import { ScreenContainerHOC } from '../../shared/components/hoc/ScreenContainerHOC'
import { StatusBarStandard } from '../../shared/components/StatusBarStandard'
import { PendingAuthView } from './PendingAuthView'

import { CAMERA_PERMISSION_MESSAGE, CAMERA_PERMISSION_TITLE } from '../../../constants/strings'

import { styles } from '../styles/styles.home'

const Container = ScreenContainerHOC(View)

export class Home extends Component {
  static propTypes = {
    registerEmployee: func.isRequired,
    onHistoryPress: func.isRequired,
  }

  state = {
    imageSnap: undefined,
    modalVisible: false,
  }

  hideModal = () => this.setState({ modalVisible: false, imageSnap: undefined })

  navigateToHistory = () => {
    const { onHistoryPress } = this.props
    this.setState({ modalVisible: false, imageSnap: undefined })
    onHistoryPress()
  }

  takePicture = async () => {
    if (this.camera) {
      const { registerEmployee } = this.props
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
        mirrorImage: true,
      }
      const data = await this.camera.takePictureAsync(options)
      this.setState({ imageSnap: data.uri, modalVisible: true })
      return registerEmployee('', data.base64)
    }
    return this.setState({ imageSnap: undefined })
  }

  render() {
    const { imageSnap, modalVisible } = this.state
    const modalOptions = [
      {
        label: 'Bater ponto',
        iconName: 'map-marker-radius',
        onPress: () => console.warn('Bater ponto')
      },
      {
        label: 'Ver histórico',
        iconName: 'clock-outline',
        onPress: () => console.warn('Ver histórico')
      },
      {
        label: 'Melhorar identificação',
        iconName: 'creation',
        onPress: () => console.warn('Melhorar identificação')
      },
    ]
    return (
      <Container style={styles.container}>
        <StatusBarStandard />
        {imageSnap
          ? <Image source={{ uri: imageSnap }} style={styles.preview} />
          : (
            <View style={styles.preview}>
              <RNCamera
                ref={(ref) => { this.camera = ref }}
                style={styles.preview}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={CAMERA_PERMISSION_TITLE}
                permissionDialogMessage={CAMERA_PERMISSION_MESSAGE}
              />
              <View style={styles.bottomOverlay}>
                <View style={styles.captureWrap}>
                  <TouchableOpacity style={styles.capture} onPress={() => this.takePicture(this.camera)} />
                </View>
              </View>
            </View>
          )
        }
        <OptionsModal
          isVisible={modalVisible}
          onCancel={this.hideModal}
          onHistoryPress={this.navigateToHistory}
          options={modalOptions}
        />
      </Container>
    )
  }
}
