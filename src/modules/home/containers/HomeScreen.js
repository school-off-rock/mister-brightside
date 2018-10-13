import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { connect } from 'react-redux'

import { RNCamera } from 'react-native-camera'
import { registerEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'

class HomeScreenContainer extends Component {
  state = {}

  takePicture = async () => {
    if (this.camera) {
      const { registerEmployee } = this.props
      const options = { quality: 0.5, base64: true, forceUpOrientation: true }
      const data = await this.camera.takePictureAsync(options)
      registerEmployee('', data.base64)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})

const mapStateToProps = state => ({
  isLoading: getLoading(state)
})

const mapDispatchToProps = {
  registerEmployee: (registration, image) => registerEmployeeAction(registration, image)
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)
