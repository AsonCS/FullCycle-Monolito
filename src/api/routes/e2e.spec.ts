import request from 'supertest'
import { app } from '../express'
import { sequelize, setupDb } from '../sequelize'
import { AddClientFacadeInputDto } from '../../modules/client-adm/facade/client-adm.facade.interface'
import { AddProductFacadeInputDto } from '../../modules/product-adm/facade/product-adm.facade.interface'
import {
  FindAllCheckoutFacadeOutputDto,
  PlaceOrderCheckoutFacadeInputDto
} from '../../modules/checkout/facade/checkout.facade.interface'
import { FindAllInvoiceFacadeOutputDto } from '../../modules/invoice/facade/invoice.facade.interface'

describe('E2E test', () => {
  beforeEach(async () => {
    await setupDb(':memory:')
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should place an order', async () => {
    const inputClient: AddClientFacadeInputDto = {
      id: 'ClientId',
      name: 'Lucian',
      email: 'lucian@xpto.com',
      document: '1234-5678',
      address: {
        street: 'Rua 123',
        number: '99',
        complement: 'Casa Verde',
        city: 'Criciúma',
        state: 'SC',
        zipCode: '88888-888'
      }
    }
    const responseClient = await request(app)
      .post('/clients')
      .send(inputClient)

    expect(responseClient.status).toBe(204)
    expect(responseClient.body).toEqual({})

    const inputProduct1: AddProductFacadeInputDto =
      {
        id: 'ProductId1',
        name: 'Chair',
        description: 'Chair description',
        purchasePrice: 100,
        salesPrice: 100,
        stock: 10
      }
    const responseProduct1 = await request(app)
      .post('/products')
      .send(inputProduct1)

    expect(responseProduct1.status).toBe(204)
    expect(responseProduct1.body).toEqual({})

    const inputProduct2: AddProductFacadeInputDto =
      {
        id: 'ProductId2',
        name: 'Table',
        description: 'Table description',
        purchasePrice: 200,
        salesPrice: 200,
        stock: 20
      }
    const responseProduct2 = await request(app)
      .post('/products')
      .send(inputProduct2)

    expect(responseProduct2.status).toBe(204)
    expect(responseProduct2.body).toEqual({})

    const inputOrder: PlaceOrderCheckoutFacadeInputDto =
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
    const responseOrder = await request(app)
      .post('/checkout')
      .send(inputOrder)

    if (responseOrder.body.error) {
      console.log(responseOrder.body.error)
    }
    expect(responseOrder.status).toBe(204)
    expect(responseOrder.body).toEqual({})

    const responseOrders = await request(app).get(
      '/checkout'
    )

    expect(responseOrders.status).toBe(200)

    const outputOrders: FindAllCheckoutFacadeOutputDto[] =
      responseOrders.body

    expect(outputOrders.length).toBe(1)
    expect(outputOrders[0].id).toBeDefined()
    expect(outputOrders[0].client.id).toBe(
      'ClientId'
    )
    expect(outputOrders[0].client.name).toBe(
      'Lucian'
    )
    expect(outputOrders[0].client.email).toBe(
      'lucian@xpto.com'
    )
    expect(
      outputOrders[0].client.address.street
    ).toBe('Rua 123')
    expect(
      outputOrders[0].client.address.number
    ).toBe('99')
    expect(
      outputOrders[0].client.address.complement
    ).toBe('Casa Verde')
    expect(
      outputOrders[0].client.address.city
    ).toBe('Criciúma')
    expect(
      outputOrders[0].client.address.state
    ).toBe('SC')
    expect(
      outputOrders[0].client.address.zipCode
    ).toBe('88888-888')
    expect(outputOrders[0].products.length).toBe(
      2
    )
    expect(
      outputOrders[0].products[0].id
    ).toBeDefined()
    expect(outputOrders[0].products[0].name).toBe(
      'Chair'
    )
    expect(
      outputOrders[0].products[0].description
    ).toBe('Chair description')
    expect(
      outputOrders[0].products[0].salesPrice
    ).toBe(100)
    expect(
      outputOrders[0].products[1].id
    ).toBeDefined()
    expect(outputOrders[0].products[1].name).toBe(
      'Table'
    )
    expect(
      outputOrders[0].products[1].description
    ).toBe('Table description')
    expect(
      outputOrders[0].products[1].salesPrice
    ).toBe(200)
    expect(outputOrders[0].status).toBe(
      'approved'
    )

    const responseInvoices = await request(
      app
    ).get('/invoice')

    expect(responseInvoices.status).toBe(200)

    const resultsInvoices: FindAllInvoiceFacadeOutputDto[] =
      responseInvoices.body

    expect(resultsInvoices.length).toBe(1)
    expect(resultsInvoices[0].id).toBeDefined()
    expect(resultsInvoices[0].name).toBe('Lucian')
    expect(resultsInvoices[0].document).toBe(
      '1234-5678'
    )
    expect(
      resultsInvoices[0].address.street
    ).toBe('Rua 123')
    expect(
      resultsInvoices[0].address.number
    ).toBe('99')
    expect(
      resultsInvoices[0].address.complement
    ).toBe('Casa Verde')
    expect(resultsInvoices[0].address.city).toBe(
      'Criciúma'
    )
    expect(resultsInvoices[0].address.state).toBe(
      'SC'
    )
    expect(
      resultsInvoices[0].address.zipCode
    ).toBe('88888-888')
    expect(resultsInvoices[0].items.length).toBe(
      2
    )
    expect(resultsInvoices[0].items[0].id).toBe(
      'ProductId1'
    )
    expect(resultsInvoices[0].items[0].name).toBe(
      'Chair'
    )
    expect(
      resultsInvoices[0].items[0].price
    ).toBe(100)
    expect(resultsInvoices[0].items[1].id).toBe(
      'ProductId2'
    )
    expect(resultsInvoices[0].items[1].name).toBe(
      'Table'
    )
    expect(
      resultsInvoices[0].items[1].price
    ).toBe(200)
    expect(resultsInvoices[0].total).toBe(300)
    expect(
      resultsInvoices[0].createdAt
    ).toBeDefined()
  })
})
