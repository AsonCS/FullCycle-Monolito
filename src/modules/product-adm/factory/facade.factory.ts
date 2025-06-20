import ProductAdmFacade from '../facade/product-adm.facade'
import ProductAdmFacadeInterface from '../facade/product-adm.facade.interface'
import ProductRepository from '../repository/product.repository'
import AddProductUseCase from '../usecase/add-product/add-product.usecase'
import CheckStockUseCase from '../usecase/check-stock/check-stock.usecase'
import FindAllUseCase from '../usecase/find-all-products/find-all.usecase'

export default class ProductAdmFacadeFactory {
  static create(): ProductAdmFacadeInterface {
    const productRepository =
      new ProductRepository()
    const addProductUseCase =
      new AddProductUseCase(productRepository)
    const findAllUseCase = new FindAllUseCase(
      productRepository
    )
    const checkStockUseCase =
      new CheckStockUseCase(productRepository)
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      findAllUseCase: findAllUseCase,
      stockUseCase: checkStockUseCase
    })

    return productFacade
  }
}
