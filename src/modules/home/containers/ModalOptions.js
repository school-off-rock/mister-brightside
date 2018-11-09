import React from 'react'
import {
  oneOf,
  bool,
  func,
  arrayOf,
  string,
  shape,
} from 'prop-types'
import { connect } from 'react-redux'

import { OptionsModal } from '../components/OptionsModal'

import { getIpStatus } from '../../../redux/reducers/auth/selectors'
import { verifyIpAddressAction } from '../../../redux/actions/async/asyncAuthActions'

class Modal extends React.Component {
  static propTypes = {
    ipStatus: oneOf(['NOT_SET', 'VALID', 'INVALID']),
    isVisible: bool,
    onCancel: func.isRequired,
    verifyIpAddress: func.isRequired,
    options: arrayOf(shape({
      label: string,
      iconName: string,
      onPress: func,
    })).isRequired
  }

  static defaultProps = {
    isVisible: false,
    ipStatus: 'NOT_SET',
  }

  updateIpStatus = () => this.props.verifyIpAddress()

  render() {
    const {
      ipStatus,
      isVisible,
      onCancel,
      options,
    } = this.props
    return (
      <OptionsModal
        ipStatus={ipStatus}
        isVisible={isVisible}
        onCancel={onCancel}
        options={options}
      />
    )
  }
}

const mapStateToProps = state => ({
  ipStatus: getIpStatus(state),
})

const mapDispatchToProps = {
  verifyIpAddress: () => verifyIpAddressAction(),
}

export const ModalOptions = connect(mapStateToProps, mapDispatchToProps)(Modal)
