import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ProductGateway from '../../gateway/product.gateway'
import { FindAllOutputDto } from './find-all-products.dto'

export default class FindAllUseCase
  implements UseCaseInterface
{
  private _productRepository: ProductGateway

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository
  }

  async execute(): Promise<FindAllOutputDto> {
    const result =
      await this._productRepository.findAll()
    return {
      products: result.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        purchasePrice: product.purchasePrice,
        stock: product.stock
      }))
    }
  }
}
