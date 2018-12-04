import { SET_MODAL, SET_ON_DISMISS_MODAL } from '../../types/modalTypes'

export const setModalAction = ({
  isVisible, theme, title, description, iconName, buttonLabel, onAction, actionButtonLabel
}) => ({
  type: SET_MODAL,
  isVisible,
  theme,
  iconName,
  title,
  description,
  buttonLabel,
  onAction,
  actionButtonLabel
})

export const setOnDismissModal = onDismiss => ({ type: SET_ON_DISMISS_MODAL, onDismiss })
