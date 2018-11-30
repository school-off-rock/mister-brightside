import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class FaceDetectionShelter extends Component {
  state = {
    serious: undefined,
    smiling: undefined,
    isSmiling: undefined
  }

  // componentDidUpdate = (prevProps) => {
  //   if ('smilingProbability' in prevProps) {
  //     if (prevProps.smilingProbability > 0.3 && !this.state.smiling) {
  //       this.setState({ smiling: true, serious: false })
  //     }
  //     if (prevProps.smilingProbability <= 0.3 && !this.state.serious) {
  //       this.setState({ serious: true, smiling: false })
  //     }
  //   }
  // }

  // if ('leftEyeOpenProbability' in faces) {
  //   if (faces.leftEyeOpenProbability >= 0.4 && !this.state.isLeftEyeOpen) {
  //     this.setState({ isLeftEyeOpen: true })
  //   } else if (faces.leftEyeOpenProbability < 0.4 && this.state.isLeftEyeOpen) {
  //     this.setState({ isLeftEyeOpen: false })
  //   }
  //   this.leftEyeOpenProbability = faces.leftEyeOpenProbability
  // }
  // console.log(response)
  // if (faces && faces.length > 0) this.setState({ ...faces[0] })

  render() {
    const { isSmiling } = this.props
    return (
      <View style={s.container}>
        {!isSmiling && <Text>serious</Text>}
        {isSmiling && <Text>smiling</Text>}
      </View>
    )
  }
}

const s = {
  container: {
    backgroundColor: 'white'
  }
}
