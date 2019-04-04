import React, { Component, Fragment } from 'react'
import { View, StyleSheet } from 'react-native'

import { InputWithLabel } from '../../shared/components/inputs/InputWithLabel'
import { Card } from '../../shared/components/Card'
import { H5, Paragraph } from '../../shared/components/text'
import glamorous from 'glamorous-native'
import { DarkOverlay } from '../../shared/components/overlays/DarkOverlay'
import { Icon } from '../../shared/components/Icon'
import { COLORS } from '../../../constants/theme'
import { hasText } from '../../../config/functions'

const FooterCard = glamorous(Card)((props, theme) => ({
  borderRadius: theme.borderRadius,
  margin: theme.module.bit,
}))

export class RegisterInput extends Component {
  state = { userID: undefined }

  setID = userID => this.setState({ userID })

  render() {
    const { userID } = this.state
    return (
      <Fragment>
        <DarkOverlay />
        <View style={{ ...StyleSheet.absoluteFillObject, top: null }}>
          <FooterCard>
            <H5 style={{ marginTop: 16, marginHorizontal: 16 }}>Uau!</H5>
            <Paragraph style={{ marginVertical: 8, marginHorizontal: 16 }}>
              Este realmente é o seu melhor ângulo! Agora defina um nome de
              usuário para sabermos como vamos te chamar:
            </Paragraph>
            <View
              style={{
                marginHorizontal: 16,
                marginBottom: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <InputWithLabel
                  label="Seu ID"
                  keyboardType="default"
                  onChangeText={this.setID}
                  autoCapitalize="none"
                />
              </View>
              <Icon
                name="chevron-right"
                disabled={!hasText(userID) || userID.length < 4}
                color={COLORS.PRIMARY}
              />
            </View>
          </FooterCard>
        </View>
      </Fragment>
    )
  }
}
