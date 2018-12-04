export const setModal = (state, {
  isVisible, theme, iconName, title, description, buttonLabel, onAction, actionButtonLabel
}) => ({
  ...state,
  isVisible,
  theme,
  iconName,
  title,
  description,
  buttonLabel,
  onAction,
  actionButtonLabel
})

export const setOnDismissModal = (state, { onDismiss }) => ({ ...state, onDismiss })
