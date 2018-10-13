import { registerEmployeeEntry, getEmployeeClockEntries } from '../../../services/user'
import { loadingEmployee, loadingClockEntries, saveClockEntries } from '../sync/syncClockEntryActions'
import { verifyIpAddress } from '../../../services/auth'

export function registerEmployeeEntryAction(registration) {
  return async (dispatch) => {
    try {
      dispatch(loadingEmployee(true))
      await verifyIpAddress()
      await registerEmployeeEntry(registration)
      dispatch(loadingEmployee(false))
    } catch (error) {
      dispatch(loadingEmployee(false))
      throw error
    }
  }
}


export function fetchEmployeeEntriesAction(registration, initDate, endDate) {
  return async (dispatch) => {
    try {
      dispatch(loadingClockEntries(true))
      await verifyIpAddress()
      const clockEntries = await getEmployeeClockEntries(registration, initDate, endDate)
      dispatch(saveClockEntries(clockEntries))
    } catch (error) {
      dispatch(loadingClockEntries(false))
      throw error
    }
  }
}
