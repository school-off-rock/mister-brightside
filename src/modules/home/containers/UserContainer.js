import React, { Component } from 'react'
import { View } from 'react-native'
import glamorous from 'glamorous-native'

import { styles } from '../styles/styles.home'

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
    return (
      <View style={styles.userContainer}>
        <AvatarWrap>
          <UserImage
            source={{
              uri:
                'https://source.unsplash.com/200x200/?person,smiling,smile,happy',
            }}
          />
        </AvatarWrap>
      </View>
    )
  }
}

export const UserContainer = User
