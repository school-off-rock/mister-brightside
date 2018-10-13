import { CLOCK_ENTRY_INITIAL_STATE } from './constants'
import { LOADING_CLOCK_ENTRIES, SAVE_CLOCK_ENTRIES, LOADING_EMPLOYEE } from '../../types/clockEntryTypes'
import { loadingClockEntries, saveClockEntries, loadingEmployee } from './handlers'

export const actionHandlers = {
  [LOADING_EMPLOYEE]: loadingEmployee,
  [LOADING_CLOCK_ENTRIES]: loadingClockEntries,
  [SAVE_CLOCK_ENTRIES]: saveClockEntries
}

export const clockEntryReducerConfig = {
  initialState: CLOCK_ENTRY_INITIAL_STATE,
  actionHandlers
}
