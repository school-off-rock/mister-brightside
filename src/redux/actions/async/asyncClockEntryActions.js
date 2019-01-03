import {
  registerEmployeeEntry,
  getEmployeeClockEntries,
  checkEmployeeEntryTime
} from "../../../services/user"
import {
  loadingEmployee,
  loadingClockEntries,
  saveClockEntries
} from "../sync/syncClockEntryActions"
import { setModalAction } from "../sync/syncModalAction"
import { MODAL } from "../../../constants/modals"

export function checkEmployeeEntryTimeAction() {
  return async dispatch => {
    try {
      const clockInTimeStatus = await checkEmployeeEntryTime()
      return clockInTimeStatus
    } catch (err) {
      throw err
    }
  }
}

export function registerEmployeeEntryAction() {
  return async dispatch => {
    try {
      dispatch(loadingEmployee(true))
      await registerEmployeeEntry()
      dispatch(loadingEmployee(false))
      dispatch(setModalAction(MODAL.CLOCK_IN_SUCCESS))
    } catch (err) {
      dispatch(loadingEmployee(false))
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      } else {
        dispatch(setModalAction(MODAL.CLOCK_IN_FAIL))
      }
      throw err
    }
  }
}

export function fetchEmployeeEntriesAction(initDate, endDate) {
  return async dispatch => {
    try {
      dispatch(loadingClockEntries(true))
      // await verifyIpAddress()
      const clockEntries = await getEmployeeClockEntries(initDate, endDate)
      dispatch(saveClockEntries(clockEntries))
    } catch (err) {
      if (err.ipError === true) {
        dispatch(setModalAction(MODAL.IP_VALIDATION_FAIL))
      }
      dispatch(loadingClockEntries(false))
      throw err
    }
  }
}
