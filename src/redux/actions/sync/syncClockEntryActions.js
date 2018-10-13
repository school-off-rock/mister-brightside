import { LOADING_CLOCK_ENTRIES, SAVE_CLOCK_ENTRIES, LOADING_EMPLOYEE } from '../../types/clockEntryTypes'

export const loadingEmployee = loading => ({ type: LOADING_EMPLOYEE, loading })
export const loadingClockEntries = loadingClockEntries => ({ type: LOADING_CLOCK_ENTRIES, loadingClockEntries })
export const saveClockEntries = clockEntries => ({ type: SAVE_CLOCK_ENTRIES, clockEntries })
