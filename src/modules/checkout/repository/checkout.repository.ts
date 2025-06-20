import Id from '../../@shared/domain/value-object/id.value-object'
import Client from '../domain/client.entity'
import Order from '../domain/order.entity'
import Product from '../domain/product.entity'
import CheckoutGateway from '../gateway/checkout.gateway'
import OrderModel, {
  OrderFields
} from './order.model'
import Address from '../../@shared/domain/value-object/address'
import ClientModel from '../../@shared/repository/client.model'
import ProductModel from '../../@shared/repository/product.model'

export default class CheckoutRepository
  implements CheckoutGateway
{
  async add(order: Order): Promise<void> {
    await ClientModel.create(
      {
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
      {
        ignoreDuplicates: true
      }
    )
    const input: OrderFields = {
      id: order.id.id,
      status: order.status
    }
    await OrderModel.create(
      {
        clientId: order.client.id.id,
        ...input
      },
      {
        include: [ClientModel, ProductModel]
      }
    )
    await Promise.all(
      order.products.map((product) => {
        ProductModel.update(
          {
            id: product.id.id,
            name: product.name,
            orderId: order.id.id,
            description: product.description,
            salesPrice: product.salesPrice
          },
          {
            where: { id: product.id.id }
          }
        )
      })
    )
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [ClientModel, ProductModel]
    })
    return orders.map(
      (order) =>
        new Order({
          id: new Id(order.id),
          client: new Client({
            id: new Id(order.clientFields.id),
            name: order.clientFields.name,
            email: order.clientFields.email,
            address: Address.newInstance({
              street: order.clientFields.street,
              number: order.clientFields.number,
              complement:
                order.clientFields.complement,
              city: order.clientFields.city,
              state: order.clientFields.state,
              zipCode: order.clientFields.zipcode
            })
          }),
          products: order.productsFields.map(
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
