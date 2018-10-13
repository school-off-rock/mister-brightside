import { Values } from './values'

const { API_URL, KAIROS_API_URL, IP_ADDRESS_API } = Values

export const VERIFY_EMPLOYEE_REGISTRATION = reg => `${API_URL}funcionario?matricula=${reg}`
export const REGISTER_EMPLOYEE_PHOTO = `${KAIROS_API_URL}enroll`
export const VERIFY_IP_ADDRESS = ipAddress => `${API_URL}ponto/ip/${ipAddress}`
export const REGISTER_EMPLOYEE_ENTRY = `${API_URL}ponto/registrar`
export const GET_EMPLOYEE_CLOCK_ENTRIES = (reg, initDate, endDate) => `${API_URL}ponto/registros/${reg}?dataInicio=${initDate}&dataFim=${endDate}`
export const GET_IP_ADDRESS = `${IP_ADDRESS_API}?format=json`
export const VERIFY_EMPLOYEE_PHOTO = `${KAIROS_API_URL}recognize`
export const TRAIN_EMPLOYEE_PHOTO = `${KAIROS_API_URL}enroll`
