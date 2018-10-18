import React from 'react'
import { connect } from 'react-redux'
import { node, number, object } from 'prop-types'
import { SafeAreaView } from 'react-navigation'

import { getNavBarHeight } from '../../../redux/reducers/navBar/selectors'

import { METRICS } from '../../../constants/theme'

import { styles } from '../components/hoc/style/hoc.styles'

const ViewAvoidNavBarContainer = ({ children, navBarHeight, forceInset }) => {
  return (
    <SafeAreaView style={[styles.container, { paddingTop: navBarHeight + METRICS.STATUS_BAR_HEIGHT }]} forceInset={{ top: 'never', ...forceInset }}>
      {children}
    </SafeAreaView>
  )
}

ViewAvoidNavBarContainer.propTypes = {
  children: node,
  navBarHeight: number.isRequired,
  forceInset: object,
}

ViewAvoidNavBarContainer.defaultProps = {
  children: null,
  forceInset: {},
}

const mapStateToProps = state => ({ navBarHeight: getNavBarHeight(state) })

export const ViewAvoidNavBar = connect(mapStateToProps)(ViewAvoidNavBarContainer)
