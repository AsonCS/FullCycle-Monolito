import Order from '../domain/order.entity'

export default interface CheckoutGateway {
  add(order: Order): Promise<void>
  findAll(): Promise<Order[]>
}
