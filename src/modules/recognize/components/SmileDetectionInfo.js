import React, { Fragment } from 'react'
import { View, StyleSheet } from 'react-native'
import { CardWithMargin } from '../../shared/components/cards/CardWithMargin'
import { H5, Paragraph } from '../../shared/components/text'

export function SmileDetectionInfo() {
  return (
    <Fragment>
      <View style={{ ...StyleSheet.absoluteFillObject, top: null }}>
        <CardWithMargin>
          <H5 style={{ marginTop: 16, marginHorizontal: 16 }}>
            Hora do reconhecimento
          </H5>
          <Paragraph
            style={{ marginTop: 8, marginHorizontal: 16, marginBottom: 16 }}
          >
            Posicione-se em frente à camera e sorria para ativar
          </Paragraph>
        </CardWithMargin>
      </View>
    </Fragment>
  )
}
