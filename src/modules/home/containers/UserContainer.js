import React, { Component } from 'react'
import { View } from 'react-native'
import glamorous from 'glamorous-native'

import { styles } from '../styles/styles.home'
import { hasText } from '../../../config/functions'
import { H2, H5 } from '../../shared/components/text'
import { ButtonContained } from '../../shared/components/buttons/ButtonContained'
import { COLORS } from '../../../constants/theme'

const AvatarWrap = glamorous.view((props, theme) => ({
  width: 200,
  aspectRatio: 1,
  borderRadius: 100,
  backgroundColor: theme.colors.background.surface,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 1,
}))

const UserImage = glamorous.image({
  width: 192,
  height: 192,
  borderRadius: 96,
  resizeMode: 'cover',
})

export class User extends Component {
  render() {
    const { user } = this.props
    const userImage =
      user.imageUrl ||
      'https://source.unsplash.com/200x200/?person,smiling,smile,happy'
    return (
      <View style={styles.userContainer}>
        <AvatarWrap>
          <UserImage source={{ uri: userImage }} />
        </AvatarWrap>
        {hasText(user.label) && (
          <H5
            style={{
              textAlign: 'center',
              marginTop: 16,
              paddingHorizontal: 24,
            }}
          >
            {user.label}
          </H5>
        )}
      </View>
    )
  }
}

export const UserContainer = User
