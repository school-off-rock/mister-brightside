export const setModal = (
  state, {
    description,
    iconName,
    isVisible,
    theme,
    title,
  }
) => ({
  ...state,
  description,
  iconName,
  isVisible,
  theme,
  title,
})
