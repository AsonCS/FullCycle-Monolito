import ClientModel from '../../@shared/repository/client.model'

export interface CheckoutClientFields {
  id: string
  name: string
  email: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipcode: string
}

export class CheckoutClientModel
  extends ClientModel
  implements CheckoutClientFields {}
