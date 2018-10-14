import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'

import { registerEmployeeAction } from '../../../redux/actions/async/asyncAuthActions'
import { getLoading } from '../../../redux/reducers/auth/selectors'
import { Home } from '../components/Home'

class HomeScreenContainer extends Component {
  static propTypes = {
    registerEmployee: func.isRequired,
  }

  state = {}

  takePicture = async () => {
    if (this.camera) {
      const { registerEmployee } = this.props
      const options = { quality: 0.5, base64: true, forceUpOrientation: true }
      const data = await this.camera.takePictureAsync(options)
      registerEmployee('', data.base64)
    }
  };

  render() {
    const { registerEmployee } = this.props
    return (
      <Home
        registerEmployee={registerEmployee}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state)
})

const mapDispatchToProps = {
  registerEmployee: (registration, image) => registerEmployeeAction(registration, image)
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)
