
const getFirstName = (name) => {
  const [firtstName] = name.split(' ')
  return firtstName
}
export class Employee {
  constructor({
    id,
    nome,
    matricula,
    funcao
  }) {
    this.id = id
    this.nome = nome
    this.firstName = getFirstName(nome)
    this.registration = matricula
    this.function = funcao
  }
}
