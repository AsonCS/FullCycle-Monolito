import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from './invoice.model'
import InvoiceItemModel from './invoice-item.model'
import Invoice from '../domain/invoice'
import Id from '../../@shared/domain/value-object/id.value-object'
import Address from '../../@shared/domain/value-object/address'
import InvoiceItem from '../domain/invoice-item'
import InvoiceRepository from './invoice-repository'

describe('InvoiceRepository test', () => {
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
        InvoiceModel,
        InvoiceItemModel
      ])
      await sequelize.sync()
    })

    afterEach(async () => {
      await sequelize.close()
    })
  })()

  it('should create an invoice', async () => {
    const invoice = new Invoice({
      id: new Id('Invoice 1'),
      name: 'Invoice name',
      document: 'Invoice document',
      address: Address.newInstance({
        street: 'Invoice street',
        number: 'Invoice number',
        complement: 'Invoice complement',
        city: 'Invoice city',
        state: 'Invoice state',
        zipCode: 'Invoice zipCode'
      }),
      items: [
        new InvoiceItem({
          id: 'Invoice item 1',
          name: 'Invoice item name',
          price: 100
        }),
        new InvoiceItem({
          id: 'Invoice item 2',
          name: 'Invoice item 2 name',
          price: 200
        })
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const repository = new InvoiceRepository()
    await repository.add(invoice)

    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [InvoiceItemModel]
    })

    expect(result).toBeDefined()
    expect(result.id).toEqual(invoice.id.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(
      invoice.document
    )
    expect(result.street).toEqual(
      invoice.address.street
    )
    expect(result.number).toEqual(
      invoice.address.number
    )
    expect(result.complement).toEqual(
      invoice.address.complement
    )
    expect(result.city).toEqual(
      invoice.address.city
    )
    expect(result.state).toEqual(
      invoice.address.state
    )
    expect(result.zipCode).toEqual(
      invoice.address.zipCode
    )
    expect(result.items.length).toBe(2)
    expect(result.items[0].id).toEqual(
      invoice.items[0].id
    )
    expect(result.items[0].name).toEqual(
      invoice.items[0].name
    )
    expect(result.items[0].price).toEqual(
      invoice.items[0].price
    )
    expect(result.items[1].id).toEqual(
      invoice.items[1].id
    )
    expect(result.items[1].name).toEqual(
      invoice.items[1].name
    )
    expect(result.items[1].price).toEqual(
      invoice.items[1].price
    )
    expect(result.createdAt.toString()).toEqual(
      invoice.createdAt.toString()
    )
    expect(result.updatedAt.toString()).toEqual(
      invoice.updatedAt.toString()
    )
  })

  it('should find an invoice', async () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    await InvoiceModel.create(
      {
        id: 'Invoice 1',
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Invoice street',
        number: 'Invoice number',
        complement: 'Invoice complement',
        city: 'Invoice city',
        state: 'Invoice state',
        zipCode: 'Invoice zipCode',
        items: [
          {
            id: 'Invoice item 1',
            name: 'Invoice item name',
            price: 100
          },
          {
            id: 'Invoice item 2',
            name: 'Invoice item 2 name',
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
    const repository = new InvoiceRepository()

    const result = await repository.find(
      'Invoice 1'
    )

    expect(result).toBeDefined()
    expect(result.id.id).toEqual('Invoice 1')
    expect(result.name).toEqual('Invoice name')
    expect(result.document).toEqual(
      'Invoice document'
    )
    expect(result.address.street).toEqual(
      'Invoice street'
    )
    expect(result.address.number).toEqual(
      'Invoice number'
    )
    expect(result.address.complement).toEqual(
      'Invoice complement'
    )
    expect(result.address.city).toEqual(
      'Invoice city'
    )
    expect(result.address.state).toEqual(
      'Invoice state'
    )
    expect(result.address.zipCode).toEqual(
      'Invoice zipCode'
    )
    expect(result.items.length).toBe(2)
    expect(result.items[0].id).toEqual(
      'Invoice item 1'
    )
    expect(result.items[0].name).toEqual(
      'Invoice item name'
    )
    expect(result.items[0].price).toEqual(100)
    expect(result.items[1].id).toEqual(
      'Invoice item 2'
    )
    expect(result.items[1].name).toEqual(
      'Invoice item 2 name'
    )
    expect(result.items[1].price).toEqual(200)
    expect(result.total).toBe(300)
    expect(result.createdAt.toString()).toEqual(
      createdAt.toString()
    )
    expect(result.updatedAt.toString()).toEqual(
      updatedAt.toString()
    )
  })

  it('should find all invoices', async () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    await InvoiceModel.create(
      {
        id: 'Invoice 1',
        name: 'Invoice name',
        document: 'Invoice document',
        street: 'Invoice street',
        number: 'Invoice number',
        complement: 'Invoice complement',
        city: 'Invoice city',
        state: 'Invoice state',
        zipCode: 'Invoice zipCode',
        items: [
          {
            id: 'Invoice item 1',
            name: 'Invoice item name',
            price: 100
          },
          {
            id: 'Invoice item 2',
            name: 'Invoice item 2 name',
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
    const repository = new InvoiceRepository()

    const results = await repository.findAll()
    const result = results[0]

    expect(result).toBeDefined()
    expect(result.id.id).toEqual('Invoice 1')
    expect(result.name).toEqual('Invoice name')
    expect(result.document).toEqual(
      'Invoice document'
    )
    expect(result.address.street).toEqual(
      'Invoice street'
    )
    expect(result.address.number).toEqual(
      'Invoice number'
    )
    expect(result.address.complement).toEqual(
      'Invoice complement'
    )
    expect(result.address.city).toEqual(
      'Invoice city'
    )
    expect(result.address.state).toEqual(
      'Invoice state'
    )
    expect(result.address.zipCode).toEqual(
      'Invoice zipCode'
    )
    expect(result.items.length).toBe(2)
    expect(result.items[0].id).toEqual(
      'Invoice item 1'
    )
    expect(result.items[0].name).toEqual(
      'Invoice item name'
    )
    expect(result.items[0].price).toEqual(100)
    expect(result.items[1].id).toEqual(
      'Invoice item 2'
    )
    expect(result.items[1].name).toEqual(
      'Invoice item 2 name'
    )
    expect(result.items[1].price).toEqual(200)
    expect(result.total).toBe(300)
    expect(result.createdAt.toString()).toEqual(
      createdAt.toString()
    )
    expect(result.updatedAt.toString()).toEqual(
      updatedAt.toString()
    )
  })
})
