import React, { Component } from 'react'
import { connect } from 'react-redux'

import { shape, func } from 'prop-types'

import { setModalAction } from '../../../redux/actions/sync/syncModalAction'
import { getModalState } from '../../../redux/reducers/modal/selectors'

import { ModalWithIcon } from '../components/modals/ModalWithIcon'

import { COLORS } from '../../../constants/theme'
import { MODAL } from '../../../constants/modals'

import { modalPropTypes } from '../propTypes'
import { MODAL_INITIAL_STATE } from '../../../redux/reducers/modal/constants'

class ModalContainer extends Component {
  static propTypes = {
    modal: shape(modalPropTypes),
    setModal: func.isRequired
  }

  static defaultProps = {
    modal: MODAL_INITIAL_STATE
  }

  setColor = (theme) => {
    switch (theme) {
      case 'SUCCESS':
        return COLORS.POSITIVE
      case 'PRIMARY':
        return COLORS.PRIMARY
      case 'ALERT':
        return COLORS.ALERT
      default:
        return COLORS.SUCCESS
    }
  }

  dismissModal = () => this.props.setModal(MODAL.DISMISS)

  render() {
    const { modal } = this.props
    const {
      buttonLabel,
      description,
      iconName,
      isVisible,
      theme,
      title,
      onAction,
      actionButtonLabel,
    } = modal
    return (
      <ModalWithIcon
        onCancel={this.dismissModal}
        onClose={this.dismissModal}
        closeButtonLabel={buttonLabel}
        description={description}
        iconName={iconName}
        isVisible={isVisible}
        primaryColor={this.setColor(theme)}
        title={title}
        onAction={onAction}
        actionButtonLabel={actionButtonLabel}
      />
    )
  }
}

const mapStateToProps = state => ({
  modal: getModalState(state)
})

const mapDispatchToProps = {
  setModal: modal => setModalAction(modal)
}

export const ModalMain = connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
