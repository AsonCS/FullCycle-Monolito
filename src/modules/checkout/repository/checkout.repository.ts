import Id from '../../@shared/domain/value-object/id.value-object'
import { CheckoutProductModel } from '../../invoice/repository/product.model'
import Client from '../domain/client.entity'
import Order from '../domain/order.entity'
import Product from '../domain/product.entity'
import CheckoutGateway from '../gateway/checkout.gateway'
import { CheckoutClientModel } from './client.model'
import OrderModel, {
  OrderFields
} from './order.model'

export default class CheckoutRepository
  implements CheckoutGateway
{
  async add(order: Order): Promise<void> {
    const input: OrderFields = {
      id: order.id.id,
      client: {
        id: order.client.id.id,
        name: order.client.name,
        email: order.client.email
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
            address: `${order.client.street}, nº ${order.client.number} ${order.client.complement}, ${order.client.city} - ${order.client.state}, ${order.client.zipcode}`
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
