import PropTypes from 'prop-types'

export const modalPropTypes = {
  isVisible: PropTypes.bool.isRequired,
  theme: PropTypes.oneOf(['PRIMARY', 'SUCCESS', 'ALERT']),
  title: PropTypes.string,
  description: PropTypes.string,
  iconName: PropTypes.string,
  buttonLabel: PropTypes.string,
  onAction: PropTypes.func,
  actionButtonLabel: PropTypes.string,
  onDismiss: PropTypes.func
}
