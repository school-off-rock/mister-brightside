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
    this.clockIn = entrada ? moment(entrada).format('DD-MM-AAAA') : undefined
    this.clockOut = saida ? moment(saida).format('DD-MM-AAAA') : undefined
    this.employee = new Employee(funcionario)
  }
}
