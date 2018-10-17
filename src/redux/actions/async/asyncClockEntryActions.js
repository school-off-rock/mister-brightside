import { registerEmployeeEntry, getEmployeeClockEntries } from '../../../services/user'
import { loadingEmployee, loadingClockEntries, saveClockEntries } from '../sync/syncClockEntryActions'
import { verifyIpAddress } from '../../../services/auth'

export function registerEmployeeEntryAction() {
  return async (dispatch) => {
    try {
      dispatch(loadingEmployee(true))
      await verifyIpAddress()
      await registerEmployeeEntry()
      dispatch(loadingEmployee(false))
    } catch (error) {
      dispatch(loadingEmployee(false))
      throw error
    }
  }
}


export function fetchEmployeeEntriesAction(initDate, endDate) {
  return async (dispatch) => {
    try {
      dispatch(loadingClockEntries(true))
      // await verifyIpAddress()
      const clockEntries = await getEmployeeClockEntries(initDate, endDate)
      dispatch(saveClockEntries(clockEntries))
    } catch (error) {
      dispatch(loadingClockEntries(false))
      throw error
    }
  }
}
