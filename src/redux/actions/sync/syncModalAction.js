import { SET_MODAL } from '../../types/modalTypes'

export const setModalAction = (isVisible, theme, title, description, iconName) => ({
  type: SET_MODAL,
  description,
  iconName,
  isVisible,
  theme,
  title,
})
