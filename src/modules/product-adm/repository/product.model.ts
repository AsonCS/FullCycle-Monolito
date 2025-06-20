import ProductModel from '../../@shared/repository/product.model'

export interface AdmProductFields {
  id: string
  name: string
  description: string
  purchasePrice: number
  stock: number
  createdAt: Date
  updatedAt: Date
}

export class AdmProductModel
  extends ProductModel
  implements AdmProductFields {}
