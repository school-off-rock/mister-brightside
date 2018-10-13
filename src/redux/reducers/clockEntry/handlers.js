export const loadingEmployee = (state, { loading }) => ({ ...state, loading })
export const loadingClockEntries = (state, { loadingClockEntries }) => ({ ...state, loadingClockEntries })
export const saveClockEntries = (state, { clockEntries }) => ({ ...state, clockEntries, loadingClockEntries: false })
