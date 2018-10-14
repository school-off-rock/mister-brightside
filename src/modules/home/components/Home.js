import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import { func } from 'prop-types'

import { RNCamera } from 'react-native-camera'

import { styles } from '../styles/styles.home'
import { CAMERA_PERMISSION_MESSAGE, CAMERA_PERMISSION_TITLE } from '../../../constants/strings'

export class Home extends Component {
  static propTypes = {
    registerEmployee: func.isRequired,
  }

  state = {
    imageSnap: undefined,
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
      this.setState({ imageSnap: data.uri })
      return registerEmployee('', data.base64)
    }
    return this.setState({ imageSnap: undefined })
  }

  render() {
    const { imageSnap } = this.state
    return (
      <View style={styles.container}>
        {imageSnap
          ? <Image source={{ uri: imageSnap }} style={styles.preview} />
          : (
            <RNCamera
              ref={(ref) => { this.camera = ref }}
              style={styles.preview}
              type={RNCamera.Constants.Type.front}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={CAMERA_PERMISSION_TITLE}
              permissionDialogMessage={CAMERA_PERMISSION_MESSAGE}
            >
              {({ camera, status }) => {
                { /* if (status !== 'READY') return <PendingView /> */ }
                return (
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            </RNCamera>
          )
        }
        <View style={styles.bottomOverlay}>
          <View style={styles.captureWrap}>
            <TouchableOpacity style={styles.capture} onPress={this.takePicture} />
          </View>
        </View>
      </View>
    )
  }
}
