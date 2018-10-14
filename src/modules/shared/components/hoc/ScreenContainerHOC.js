import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { styles } from './style/hoc.styles'

export const ScreenContainerHOC = Component => ({ children, forceInset, ...props }) => {
  return (
    <SafeAreaView style={styles.container} forceInset={forceInset}>
      <Component {...props}>
        {children}
      </Component>
    </SafeAreaView>
  )
}
