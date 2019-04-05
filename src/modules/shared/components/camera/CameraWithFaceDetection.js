import React from 'react'
import { RNCamera } from 'react-native-camera'
import {
  CAMERA_PERMISSION_TITLE,
  CAMERA_PERMISSION_MESSAGE,
} from '../../../../constants/strings'
import { PendingAuthView } from '../../../home/components/PendingAuthView'

export const CameraWithFaceDetection = React.forwardRef(
  (
    {
      onCameraReady,
      onPictureTaken,
      onFaceDetected,
      hasFaceLandmarks,
      hasFaceClassifications,
    },
    ref
  ) => {
    const landmarks = hasFaceLandmarks ? 'all' : 'none'
    const classifications = hasFaceClassifications ? 'all' : 'none'
    return (
      <RNCamera
        ref={ref}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.front}
        permissionDialogTitle={CAMERA_PERMISSION_TITLE}
        permissionDialogMessage={CAMERA_PERMISSION_MESSAGE}
        notAuthorizedView={<PendingAuthView />}
        onCameraReady={onCameraReady}
        onPictureTaken={onPictureTaken}
        onFacesDetected={onFaceDetected}
        onFaceDetectionError={e => console.log('FACE ERROR', e)}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks[landmarks]
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications[classifications]
        }
        defaultVideoQuality={RNCamera.Constants.VideoQuality['720p']}
      />
    )
  }
)
