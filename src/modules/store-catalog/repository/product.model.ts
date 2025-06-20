import ProductModel from '../../@shared/repository/product.model'

export interface StoreCatalogProductFields {
  id: string
  name: string
  description: string
  salesPrice: number
}

export class StoreCatalogProductModel
  extends ProductModel
  implements StoreCatalogProductFields {}
