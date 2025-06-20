import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'
import ProductGateway from '../gateway/product.gateway'
import {
  StoreCatalogProductFields,
  StoreCatalogProductModel
} from './product.model'

export default class ProductRepository
  implements ProductGateway
{
  async findAll(): Promise<Product[]> {
    const products: StoreCatalogProductFields[] =
      await StoreCatalogProductModel.findAll()

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice
        })
    )
  }
  async find(id: string): Promise<Product> {
    const product: StoreCatalogProductFields =
      await StoreCatalogProductModel.findOne({
        where: {
          id: id
        }
      })

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }
}
