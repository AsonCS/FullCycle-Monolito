import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import CheckoutGateway from '../../gateway/checkout.gateway'
import { FindAllOrderUseCaseOutputDto } from './find-all-order.dto'

export default class FindAllOrderUseCase
  implements UseCaseInterface
{
  constructor(
    private readonly _orderRepository: CheckoutGateway
  ) {}

  async execute(): Promise<
    FindAllOrderUseCaseOutputDto[]
  > {
    const orders =
      await this._orderRepository.findAll()
    return orders.map((order) => ({
      id: order.id.id,
      client: {
        id: order.client.id.id,
        name: order.client.name,
        email: order.client.email,
        address: {
          street: order.client.address.street,
          number: order.client.address.number,
          complement:
            order.client.address.complement,
          city: order.client.address.city,
          state: order.client.address.state,
          zipCode: order.client.address.zipCode
        }
      },
      products: order.products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })),
      status: order.status
    }))
  }
}
