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
    this.clockIn = entrada ? moment(entrada).format('DD-MM-YYYY hh:mm:ss') : undefined
    this.clockOut = saida ? moment(saida).format('DD-MM-YYYY hh:mm:ss') : undefined
    this.employee = new Employee(funcionario)
  }
}
