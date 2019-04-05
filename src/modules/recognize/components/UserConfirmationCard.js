import React, { Fragment } from 'react'
import { View, StyleSheet } from 'react-native'
import { CardWithMargin } from '../../shared/components/cards/CardWithMargin'
import { H5, Paragraph } from '../../shared/components/text'
import { ButtonContained } from '../../shared/components/buttons/ButtonContained'
import { COLORS } from '../../../constants/theme'

export function UserConfirmationCard({
  userLabel,
  userImage,
  onConfirm,
  onCancel,
}) {
  return (
    <Fragment>
      <View style={{ ...StyleSheet.absoluteFillObject, top: null }}>
        <CardWithMargin>
          <H5 style={{ marginTop: 16, marginHorizontal: 16 }}>
            Este usuário é você?
          </H5>
          <Paragraph
            style={{ marginVertical: 8, marginHorizontal: 16, marginBottom: 8 }}
          >
            {userLabel}
          </Paragraph>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 16,
            }}
          >
            <ButtonContained
              color="none"
              textColor={COLORS.BLACK_SECONDARY_ALT}
              style={{ marginRight: 16 }}
              onPress={onCancel}
            >
              Não sou eu
            </ButtonContained>
            <ButtonContained
              color="none"
              textColor={COLORS.PRIMARY}
              onPress={onConfirm}
            >
              Confirmar
            </ButtonContained>
          </View>
        </CardWithMargin>
      </View>
    </Fragment>
  )
}
