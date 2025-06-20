import { Sequelize } from 'sequelize-typescript'
import { CheckoutClientModel } from './client.model'
import OrderModel, {
  OrderFields
} from './order.model'
import { CheckoutProductModel } from './product.model'
import Order from '../domain/order.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import Client from '../domain/client.entity'
import Product from '../domain/product.entity'
import CheckoutRepository from './checkout.repository'
import Address from '../../@shared/domain/value-object/address'

describe('CheckoutRepository test', () => {
  ;(() => {
    let sequelize: Sequelize
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })

      await sequelize.addModels([
        CheckoutClientModel,
        OrderModel,
        CheckoutProductModel
      ])
      await sequelize.sync()
    })

    afterEach(async () => {
      await sequelize.close()
    })
  })()

  it('should create an order', async () => {
    const input = new Order({
      id: new Id('Order 1'),
      client: new Client({
        id: new Id('Client 1'),
        name: 'Client name',
        email: 'Client email',
        address: Address.newInstance({
          street: 'Rua 123',
          number: '99',
          complement: 'Casa Verde',
          city: 'Criciúma',
          state: 'SC',
          zipCode: '88888-888'
        })
      }),
      products: [
        new Product({
          id: new Id('Product 1'),
          name: 'Product name',
          description: 'Product description',
          salesPrice: 100
        })
      ]
    })
    const repository = new CheckoutRepository()
    await repository.add(input)

    const result = await OrderModel.findOne({
      where: { id: input.id.id },
      include: [
        CheckoutClientModel,
        CheckoutProductModel
      ]
    })

    expect(result).toBeDefined()
    expect(result.id).toBe(input.id.id)
    expect(result.client.id).toBe(
      input.client.id.id
    )
    expect(result.client.name).toBe(
      input.client.name
    )
    expect(result.client.email).toBe(
      input.client.email
    )
    expect(result.client.street).toBe(
      input.client.address.street
    )
    expect(result.client.number).toBe(
      input.client.address.number
    )
    expect(result.client.complement).toBe(
      input.client.address.complement
    )
    expect(result.client.city).toBe(
      input.client.address.city
    )
    expect(result.client.state).toBe(
      input.client.address.state
    )
    expect(result.client.zipcode).toBe(
      input.client.address.zipCode
    )
    expect(result.products.length).toBe(1)
    expect(result.products[0].id).toBe(
      input.products[0].id.id
    )
    expect(result.products[0].name).toBe(
      input.products[0].name
    )
    expect(result.products[0].description).toBe(
      input.products[0].description
    )
    expect(result.products[0].salesPrice).toBe(
      input.products[0].salesPrice
    )
  })

  it('should find all orders', async () => {
    const input: OrderFields = {
      id: 'Order 1',
      client: {
        id: 'Client 1',
        name: 'Client name',
        email: 'Client email',
        street: 'Rua 123',
        number: '99',
        complement: 'Casa Verde',
        city: 'Criciúma',
        state: 'SC',
        zipcode: '88888-888'
      },
      products: [
        {
          id: 'Product 1',
          name: 'Product name',
          description: 'Product description',
          salesPrice: 100
        }
      ],
      status: 'pending'
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
    const repository = new CheckoutRepository()

    const results = await repository.findAll()
    const result: Order = results[0]

    expect(result).toBeDefined()
    expect(result.id.id).toBe(input.id)
    expect(result.client.id.id).toBe(
      input.client.id
    )
    expect(result.client.name).toBe(
      input.client.name
    )
    expect(result.client.email).toBe(
      input.client.email
    )
    expect(result.client.address.street).toBe(
      input.client.street
    )
    expect(result.client.address.number).toBe(
      input.client.number
    )
    expect(result.client.address.complement).toBe(
      input.client.complement
    )
    expect(result.client.address.city).toBe(
      input.client.city
    )
    expect(result.client.address.state).toBe(
      input.client.state
    )
    expect(result.client.address.zipCode).toBe(
      input.client.zipcode
    )
    expect(result.products.length).toBe(1)
    expect(result.products[0].id.id).toBe(
      input.products[0].id
    )
    expect(result.products[0].name).toBe(
      input.products[0].name
    )
    expect(result.products[0].description).toBe(
      input.products[0].description
    )
    expect(result.products[0].salesPrice).toBe(
      input.products[0].salesPrice
    )
  })
})
