import { Sequelize } from 'sequelize-typescript'
import OrderModel, {
  OrderFields
} from '../repository/order.model'
import CheckoutFacadeFactory from '../factory/facade.factory'
import {
  FindAllCheckoutFacadeOutputDto,
  PlaceOrderCheckoutFacadeInputDto,
  PlaceOrderCheckoutFacadeOutputDto
} from './checkout.facade.interface'
import ClientModel from '../../@shared/repository/client.model'
import ProductModel from '../../@shared/repository/product.model'

describe('CheckoutFacade test', () => {
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
        ClientModel,
        OrderModel,
        ProductModel
      ])
      await sequelize.sync()
    })

    afterEach(async () => {
      await sequelize.close()
    })
  })()

  it('should place an order', async () => {
    await ClientModel.create({
      id: 'Client id',
      name: 'Client name',
      email: 'Client email',
      street: 'Address street',
      number: 'Address street number',
      complement: 'Address complement',
      city: 'Address city',
      state: 'Address state',
      zipcode: 'Address zip code',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await ProductModel.create({
      id: 'Product1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      salesPrice: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const facade = CheckoutFacadeFactory.create()

    const input: PlaceOrderCheckoutFacadeInputDto =
      {
        clientId: 'Client id',
        products: [
          {
            productId: 'Product1'
          }
        ]
      }
    const result: PlaceOrderCheckoutFacadeOutputDto =
      await facade.placeOrder(input)

    expect(result.orderId).toBeDefined()
    expect(result.total).toBe(100)
    expect(result.products.length).toBe(1)
    expect(result.products[0].productId).toBe(
      'Product1'
    )
  })

  it('should find all orders', async () => {
    const input: OrderFields = {
      id: 'Order id',
      client: {
        id: 'Client id',
        name: 'Client name',
        email: 'Client email',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipcode: 'Address zip code'
      },
      products: [
        {
          id: 'Product id',
          name: 'Product name',
          description: 'Product description',
          salesPrice: 100
        }
      ],
      status: 'pending'
    }
    await OrderModel.create(
      { ...input },
      {
        include: [ClientModel, ProductModel]
      }
    )

    const facade = CheckoutFacadeFactory.create()

    const results: FindAllCheckoutFacadeOutputDto[] =
      await facade.findAll()
    const result = results[0]

    expect(result.id).toBe('Order id')
    expect(result.client.id).toBe('Client id')
    expect(result.client.name).toBe('Client name')
    expect(result.client.email).toBe(
      'Client email'
    )
    expect(result.client.address.street).toBe(
      'Address street'
    )
    expect(result.client.address.number).toBe(
      'Address street number'
    )
    expect(result.client.address.complement).toBe(
      'Address complement'
    )
    expect(result.client.address.city).toBe(
      'Address city'
    )
    expect(result.client.address.state).toBe(
      'Address state'
    )
    expect(result.client.address.zipCode).toBe(
      'Address zip code'
    )
    expect(result.products.length).toBe(1)
    expect(result.products[0].id).toBeDefined()
    expect(result.products[0].name).toBe(
      'Product name'
    )
    expect(result.products[0].description).toBe(
      'Product description'
    )
    expect(result.products[0].salesPrice).toBe(
      100
    )
    expect(result.status).toBe('pending')
  })
})
