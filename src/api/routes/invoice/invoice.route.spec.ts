import request from 'supertest'
import { app } from '../../express'
import {
  sequelize,
  setupDb
} from '../../sequelize'
import InvoiceModel from '../../../modules/invoice/repository/invoice.model'
import InvoiceItemModel from '../../../modules/invoice/repository/invoice-item.model'
import {
  FindAllInvoiceFacadeOutputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto
} from '../../../modules/invoice/facade/invoice.facade.interface'

describe('E2E test for invoice', () => {
  beforeEach(async () => {
    await setupDb(':memory:')
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should find an invoice', async () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    await InvoiceModel.create(
      {
        id: 'Invoice id',
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ],
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        include: [InvoiceItemModel]
      }
    )

    const response = await request(app).get(
      '/invoice/Invoice id'
    )

    expect(response.status).toBe(200)

    const result: FindInvoiceFacadeOutputDto =
      response.body

    expect(result.id).toBe('Invoice id')
    expect(result.name).toBe('Invoice name')
    expect(result.document).toBe(
      'Invoice document'
    )
    expect(result.address.street).toBe(
      'Address street'
    )
    expect(result.address.number).toBe(
      'Address street number'
    )
    expect(result.address.complement).toBe(
      'Address complement'
    )
    expect(result.address.city).toBe(
      'Address city'
    )
    expect(result.address.state).toBe(
      'Address state'
    )
    expect(result.address.zipCode).toBe(
      'Address zip code'
    )
    expect(result.items.length).toBe(2)
    expect(result.items[0].id).toBe('Item 1')
    expect(result.items[0].name).toBe('Item name')
    expect(result.items[0].price).toBe(100)
    expect(result.items[1].id).toBe('Item 2')
    expect(result.items[1].name).toBe(
      'Item name 2'
    )
    expect(result.items[1].price).toBe(200)
    expect(result.total).toBe(300)
    expect(
      new Date(result.createdAt).toString()
    ).toEqual(createdAt.toString())
  })

  it('should find all invoices', async () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    await InvoiceModel.create(
      {
        id: 'Invoice id',
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ],
        createdAt: createdAt,
        updatedAt: updatedAt
      },
      {
        include: [InvoiceItemModel]
      }
    )

    const response = await request(app).get(
      '/invoice'
    )

    expect(response.status).toBe(200)

    const results: FindAllInvoiceFacadeOutputDto[] =
      response.body
    const result = results[0]

    expect(result.id).toBe('Invoice id')
    expect(result.name).toBe('Invoice name')
    expect(result.document).toBe(
      'Invoice document'
    )
    expect(result.address.street).toBe(
      'Address street'
    )
    expect(result.address.number).toBe(
      'Address street number'
    )
    expect(result.address.complement).toBe(
      'Address complement'
    )
    expect(result.address.city).toBe(
      'Address city'
    )
    expect(result.address.state).toBe(
      'Address state'
    )
    expect(result.address.zipCode).toBe(
      'Address zip code'
    )
    expect(result.items.length).toBe(2)
    expect(result.items[0].id).toBe('Item 1')
    expect(result.items[0].name).toBe('Item name')
    expect(result.items[0].price).toBe(100)
    expect(result.items[1].id).toBe('Item 2')
    expect(result.items[1].name).toBe(
      'Item name 2'
    )
    expect(result.items[1].price).toBe(200)
    expect(result.total).toBe(300)
    expect(
      new Date(result.createdAt).toString()
    ).toEqual(createdAt.toString())
  })

  it('should create an invoice', async () => {
    const input: GenerateInvoiceFacadeInputDto = {
      name: 'Invoice name',
      document: 'Invoice document',
      street: 'Address street',
      number: 'Address street number',
      complement: 'Address complement',
      city: 'Address city',
      state: 'Address state',
      zipCode: 'Address zip code',
      items: [
        {
          id: 'Item 1',
          name: 'Item name',
          price: 100
        },
        {
          id: 'Item 2',
          name: 'Item name 2',
          price: 200
        }
      ]
    }
    const response = await request(app)
      .post('/invoice')
      .send(input)

    expect(response.status).toBe(204)
    expect(response.body).toEqual({})
  })

  it('should not create an invoice', async () => {
    let response = await request(app)
      .post('/invoice')
      .send({
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Name is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Document is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address street is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address number is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address complement is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address city is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address state is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        items: [
          {
            id: 'Item 1',
            name: 'Item name',
            price: 100
          },
          {
            id: 'Item 2',
            name: 'Item name 2',
            price: 200
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address zip code is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code'
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Items is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: []
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Items is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            name: 'Item name',
            price: 100
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Item id is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            price: 100
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Item name is required'
    )

    response = await request(app)
      .post('/invoice')
      .send({
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Address street',
        number: 'Address street number',
        complement: 'Address complement',
        city: 'Address city',
        state: 'Address state',
        zipCode: 'Address zip code',
        items: [
          {
            id: 'Item 1',
            name: 'Item name'
          }
        ]
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Item price is required'
    )
  })
})
