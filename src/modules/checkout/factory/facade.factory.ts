import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory'
import ProductAdmFacadeFactory from '../../product-adm/factory/facade.factory'
import StoreCatalogFacadeFactory from '../../store-catalog/factory/facade.factory'
import CheckoutFacade from '../facade/checkout.facade'
import { CheckoutFacadeInterface } from '../facade/checkout.facade.interface'
import CheckoutRepository from '../repository/checkout.repository'
import FindAllOrderUseCase from '../usecase/find-all/find-all-order.usecase'
import PlaceOrderUseCase from '../usecase/place-order/place-order.usecase'

export default class CheckoutFacadeFactory {
  static create(): CheckoutFacadeInterface {
    const repository = new CheckoutRepository()
    const findAllUseCase =
      new FindAllOrderUseCase(repository)
    const placeOrderUseCase =
      new PlaceOrderUseCase({
        clientFacade:
          ClientAdmFacadeFactory.create(),
        catalogFacade:
          StoreCatalogFacadeFactory.create(),
        productFacade:
          ProductAdmFacadeFactory.create(),
        repository: repository
      })
    const facade = new CheckoutFacade({
      findAllUseCase: findAllUseCase,
      placeOrderUseCase: placeOrderUseCase
    })

    return facade
  }
}
