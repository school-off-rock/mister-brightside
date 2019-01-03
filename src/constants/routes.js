import { Values } from "./values"

const { API_URL, FRAPI_API_URL, IP_ADDRESS_API } = Values

// IP
export const GET_IP_ADDRESS = `${IP_ADDRESS_API}?format=json`
export const VERIFY_IP_ADDRESS = ipAddress => `${API_URL}ponto/ip/${ipAddress}`

// MAGNO ID
export const VERIFY_EMPLOYEE_REGISTRATION = reg =>
  `${API_URL}funcionario?matricula=${reg}`
export const REGISTER_EMPLOYEE_ENTRY = `${API_URL}ponto/registrar`
export const CHECK_EMPLOYEE_ENTRY_TIME = registration =>
  `${API_URL}ponto/verificaescala?matricula=${registration}`
export const GET_EMPLOYEE_CLOCK_ENTRIES = (reg, initDate, endDate) =>
  `${API_URL}ponto/registros/${reg}?dataInicio=${initDate}&dataFim=${endDate}`

// IMAGE CHECK
export const TRAIN_EMPLOYEE_PHOTO = `${FRAPI_API_URL}train/person`
export const REGISTER_EMPLOYEE_PHOTO = `${FRAPI_API_URL}train/person`
export const VERIFY_EMPLOYEE_PHOTO = `${FRAPI_API_URL}recognize/people`
