import { SET_MODAL } from '../../types/modalTypes'

export const setModalAction = ({
  isVisible,
  theme,
  title,
  description,
  iconName,
  buttonLabel,
  onAction,
  actionButtonLabel
}) => ({
  type: SET_MODAL,
  isVisible,
  theme,
  iconName,
  title,
  description,
  buttonLabel,
  onAction,
  actionButtonLabel,
})
