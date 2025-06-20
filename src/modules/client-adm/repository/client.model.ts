import ClientModel from '../../@shared/repository/client.model'

export interface AdmClientFields {
  id: string
  name: string
  email: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipcode: string
  createdAt: Date
  updatedAt: Date
}

export class AdmClientModel
  extends ClientModel
  implements AdmClientFields {}
