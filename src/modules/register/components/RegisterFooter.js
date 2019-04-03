import React from 'react'
import { View } from 'react-native'

import { styles } from '../../home/styles/styles.home'
import { H5, Paragraph } from '../../shared/components/text'
import { ButtonContained } from '../../shared/components/buttons/ButtonContained'

export function RegisterFooter({ onConfirm, onCancel }) {
  return (
    <View style={styles.signUpCameraWrap}>
      <H5 style={styles.signUpCameraTitle}>Vamos criar sua conta</H5>
      <Paragraph style={styles.signUpCameraDescription}>
        Arrume seu cabelo, ajuste a postura e posicione-se em frente à camera
        para cadastrar sua primeira foto no sorria
      </Paragraph>
      <View style={styles.signUpButtonRow}>
        <ButtonContained onPress={onConfirm}>Vamos lá!</ButtonContained>
        <View style={{ flex: 1 }} />
        <ButtonContained color="none" onPress={onCancel}>
          Cancelar
        </ButtonContained>
      </View>
    </View>
  )
}
