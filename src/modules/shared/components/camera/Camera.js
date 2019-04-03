import React from 'react'
import { RNCamera } from 'react-native-camera'
import {
  CAMERA_PERMISSION_TITLE,
  CAMERA_PERMISSION_MESSAGE,
} from '../../../../constants/strings'
import { PendingAuthView } from '../../../home/components/PendingAuthView'

export const Camera = React.forwardRef(
  ({ onCameraReady, onPictureTaken }, ref) => {
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
      />
    )
  }
)
