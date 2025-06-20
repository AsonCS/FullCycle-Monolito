import Id from '../../@shared/domain/value-object/id.value-object'
import { CheckoutProductModel } from './product.model'
import Client from '../domain/client.entity'
import Order from '../domain/order.entity'
import Product from '../domain/product.entity'
import CheckoutGateway from '../gateway/checkout.gateway'
import { CheckoutClientModel } from './client.model'
import OrderModel, {
  OrderFields
} from './order.model'
import Address from '../../@shared/domain/value-object/address'

export default class CheckoutRepository
  implements CheckoutGateway
{
  async add(order: Order): Promise<void> {
    const input: OrderFields = {
      id: order.id.id,
      client: {
        id: order.client.id.id,
        name: order.client.name,
        email: order.client.email,
        street: order.client.address.street,
        number: order.client.address.number,
        complement:
          order.client.address.complement,
        city: order.client.address.city,
        state: order.client.address.state,
        zipcode: order.client.address.zipCode
      },
      products: order.products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })),
      status: order.status
    }
    await OrderModel.create(
      {
        ...input
      },
      {
        include: [
          CheckoutClientModel,
          CheckoutProductModel
        ]
      }
    )
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [
        CheckoutClientModel,
        CheckoutProductModel
      ]
    })
    return orders.map(
      (order) =>
        new Order({
          id: new Id(order.id),
          client: new Client({
            id: new Id(order.client.id),
            name: order.client.name,
            email: order.client.email,
            address: Address.newInstance({
              street: order.client.street,
              number: order.client.number,
              complement: order.client.complement,
              city: order.client.city,
              state: order.client.state,
              zipCode: order.client.zipcode
            })
          }),
          products: order.products.map(
            (product) =>
              new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
              })
          ),
          status: order.status
        })
    )
  }
}
