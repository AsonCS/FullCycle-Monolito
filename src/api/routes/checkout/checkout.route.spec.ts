import request from 'supertest'
import { app } from '../../express'
import {
  sequelize,
  setupDb
} from '../../sequelize'
import {
  FindAllCheckoutFacadeOutputDto,
  PlaceOrderCheckoutFacadeInputDto
} from '../../../modules/checkout/facade/checkout.facade.interface'
import ClientModel from '../../../modules/@shared/repository/client.model'
import ProductModel from '../../../modules/@shared/repository/product.model'
import OrderModel, {
  OrderFields
} from '../../../modules/checkout/repository/order.model'

describe('E2E test for checkout', () => {
  beforeEach(async () => {
    await setupDb(':memory:')
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should place an order', async () => {
    await ClientModel.create({
      id: 'ClientId',
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
      id: 'ProductId1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      salesPrice: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await ProductModel.create({
      id: 'ProductId2',
      name: 'Product 2',
      description: 'Product 2 description',
      purchasePrice: 200,
      stock: 20,
      salesPrice: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const input: PlaceOrderCheckoutFacadeInputDto =
      {
        clientId: 'ClientId',
        products: [
          {
            productId: 'ProductId1'
          },
          {
            productId: 'ProductId2'
          }
        ]
      }
    const response = await request(app)
      .post('/checkout')
      .send(input)

    // console.log(response.body.error)
    expect(response.status).toBe(204)
    expect(response.body).toEqual({})
  })

  it('should not place an order when the client does not exist', async () => {
    const input: PlaceOrderCheckoutFacadeInputDto =
      {
        clientId: 'ClientId',
        products: [
          {
            productId: 'ProductId1'
          },
          {
            productId: 'ProductId2'
          }
        ]
      }
    const response = await request(app)
      .post('/checkout')
      .send(input)

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Client not found'
    )
  })

  it('should not place an order when the products do not exist', async () => {
    await ClientModel.create({
      id: 'ClientId',
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

    const input: PlaceOrderCheckoutFacadeInputDto =
      {
        clientId: 'ClientId',
        products: [
          {
            productId: 'ProductId1'
          },
          {
            productId: 'ProductId2'
          }
        ]
      }
    const response = await request(app)
      .post('/checkout')
      .send(input)

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Product with id ProductId1 not found'
    )
  })

  it('should find all clients', async () => {
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

    const response = await request(app).get(
      '/checkout'
    )

    expect(response.status).toBe(200)

    const output: FindAllCheckoutFacadeOutputDto[] =
      response.body

    expect(output.length).toBe(1)
    expect(output[0].id).toBe('Order id')
    expect(output[0].client.id).toBe('Client id')
    expect(output[0].client.name).toBe(
      'Client name'
    )
    expect(output[0].client.email).toBe(
      'Client email'
    )
    expect(output[0].client.address.street).toBe(
      'Address street'
    )
    expect(output[0].client.address.number).toBe(
      'Address street number'
    )
    expect(
      output[0].client.address.complement
    ).toBe('Address complement')
    expect(output[0].client.address.city).toBe(
      'Address city'
    )
    expect(output[0].client.address.state).toBe(
      'Address state'
    )
    expect(output[0].client.address.zipCode).toBe(
      'Address zip code'
    )
    expect(output[0].products.length).toBe(1)
    expect(output[0].products[0].id).toBeDefined()
    expect(output[0].products[0].name).toBe(
      'Product name'
    )
    expect(
      output[0].products[0].description
    ).toBe('Product description')
    expect(output[0].products[0].salesPrice).toBe(
      100
    )
    expect(output[0].status).toBe('pending')
  })
})
