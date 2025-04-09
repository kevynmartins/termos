export interface Branch {
  id: string
  name: string
  address: string
  cnpj: string
}

export const branches: Branch[] = [
  {
    id: "criciuma",
    name: "Criciúma",
    address: "Rodovia Luiz Rosso Km 05, nº 3610, Primeira Linha – Criciúma/SC",
    cnpj: "02.492.310/0002-87"
  },
  {
    id: "joinville",
    name: "Joinville",
    address: "Rua Dona Francisca, nº 4571, Santo Antônio – Joinville/SC",
    cnpj: "02.492.310/0003-68"
  },
  {
    id: "tubarao",
    name: "Tubarão",
    address: "Rodovia BR 101 Km 336, nº 888, Humaitá – Tubarão/SC",
    cnpj: "86.448.941/0008-84"
  }
]
