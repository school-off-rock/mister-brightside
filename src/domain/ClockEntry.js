import moment from 'moment'
import { Employee } from './Employee'

export class ClockEntry {
  constructor({
    id,
    funcionario,
    entrada,
    saida
  }) {
    this.id = id
    this.date = entrada ? moment(entrada).format('YYYY-MM-DD') : undefined
    this.clockIn = entrada ? moment(entrada).format('HH:mm:ss') : undefined
    this.clockOut = saida ? moment(saida).format('HH:mm:ss') : undefined
    this.employee = new Employee(funcionario)
  }
}
