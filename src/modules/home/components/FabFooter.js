import React, { Component } from 'react'
import { View, Image } from 'react-native'

import { styles } from '../styles/styles.home'
import { Caption } from '../../shared/components/text'
import { FAB } from '../../shared/components/FAB'
import { IMAGES } from '../../../constants/theme'

export class FabFooter extends Component {
  render() {
    const { onPress } = this.props
    return (
      <View style={styles.fabContainer}>
        <Caption style={styles.fabCaption}>COMECE POR AQUI</Caption>
        <FAB style={styles.fab} onPress={onPress}>
          <Image
            source={IMAGES.smile}
            style={{ width: 38, height: 21, resizeMode: 'contain', top: 3 }}
          />
        </FAB>
      </View>
    )
  }
}
