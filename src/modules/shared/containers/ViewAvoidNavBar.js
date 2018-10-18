import React from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-navigation'

import { getNavBarHeight } from '../../../redux/reducers/navBar/selectors'

import { METRICS } from '../../../constants/theme'

import { styles } from '../components/hoc/style/hoc.styles'

const ViewAvoidNavBarContainer = ({
  children,
  navBarHeight,
  ...props
}) => {
  return (
    <SafeAreaView style={[styles.container, { paddingTop: navBarHeight + METRICS.STATUS_BAR_HEIGHT }]} forceInset={{ top: 'never' }}>
      {children}
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({ navBarHeight: getNavBarHeight(state) })

export const ViewAvoidNavBar = connect(mapStateToProps)(ViewAvoidNavBarContainer)
