import ProductModel from '../../@shared/repository/product.model'

export interface CheckoutProductFields {
  id: string
  name: string
  description: string
  salesPrice: number
}

export class CheckoutProductModel
  extends ProductModel
  implements CheckoutProductFields {}
