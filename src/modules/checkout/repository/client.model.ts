import ClientModel from '../../@shared/repository/client.model'

export interface CheckoutClientFields {
  id: string
  name: string
  email: string
}

export class CheckoutClientModel
  extends ClientModel
  implements CheckoutClientFields {}
