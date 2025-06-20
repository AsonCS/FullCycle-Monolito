import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'
import ProductGateway from '../gateway/product.gateway'
import {
  AdmProductFields,
  AdmProductModel
} from './product.model'

export default class ProductRepository
  implements ProductGateway
{
  async add(product: Product): Promise<void> {
    const input: AdmProductFields = {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await AdmProductModel.create({ ...input })
  }
  async find(id: string): Promise<Product> {
    const product: AdmProductFields =
      await AdmProductModel.findOne({
        where: { id }
      })

    if (!product) {
      throw new Error(
        `Product with id ${id} not found`
      )
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  }
}
