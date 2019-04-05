export const NO_ALERTS = { showAlert: false, message: '' }

export const NOT_LOGGED_IN = {
  id: undefined,
  label: undefined,
}

export const AUTH_INITIAL_STATE = {
  user: NOT_LOGGED_IN,
  isSubmittingUser: false,
  isLoggedIn: false,
  isLoading: false,
  alert: NO_ALERTS,
  // ipStatus: 'NOT_SET',
  networkType: undefined,
  hasFaceDetection: false,
}
