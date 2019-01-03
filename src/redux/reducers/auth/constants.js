export const NO_ALERTS = { showAlert: false, message: "" }

export const NOT_LOGGED_IN = {
  name: undefined,
  registration: undefined
}

export const AUTH_INITIAL_STATE = {
  user: NOT_LOGGED_IN,
  registration: undefined,
  isLoading: false,
  alert: NO_ALERTS,
  ipStatus: "NOT_SET",
  networkType: undefined,
  hasFaceDetection: false
}
