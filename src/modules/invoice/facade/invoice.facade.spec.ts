import { Sequelize } from 'sequelize-typescript'
import { InvoiceModel } from '../repository/invoice.model'
import InvoiceItemModel from '../repository/invoice-item.model'
import InvoiceRepository from '../repository/invoice-repository'
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase'
import {
  FindAllInvoiceFacadeOutputDto,
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from './invoice.facade.interface'
import InvoiceFacade from './invoice.facade'
import InvoiceFacadeFactory from '../factory/facade.factory'

describe('InvoiceFacade test', () => {
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
    const repository = new InvoiceRepository()
    const generateUseCase =
      new GenerateInvoiceUseCase(repository)
    const facade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUseCase: undefined,
      findAllUseCase: undefined
    })

    //const productFacade = ProductAdmFacadeFactory.create();

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

    let result:
      | GenerateInvoiceFacadeOutputDto
      | InvoiceModel =
      await facade.generateInvoice(input)

    expect(result.id).toBeDefined()
    expect(result.name).toBe('Invoice name')
    expect(result.document).toBe(
      'Invoice document'
    )
    expect(result.street).toBe('Address street')
    expect(result.number).toBe(
      'Address street number'
    )
    expect(result.complement).toBe(
      'Address complement'
    )
    expect(result.city).toBe('Address city')
    expect(result.state).toBe('Address state')
    expect(result.zipCode).toBe(
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

    result = await InvoiceModel.findOne({
      where: { id: result.id },
      include: [InvoiceItemModel]
    })

    expect(result.id).toBeDefined()
    expect(result.name).toBe('Invoice name')
    expect(result.document).toBe(
      'Invoice document'
    )
    expect(result.street).toBe('Address street')
    expect(result.number).toBe(
      'Address street number'
    )
    expect(result.complement).toBe(
      'Address complement'
    )
    expect(result.city).toBe('Address city')
    expect(result.state).toBe('Address state')
    expect(result.zipCode).toBe(
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
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
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

    const facade = InvoiceFacadeFactory.create()
    const input: FindInvoiceFacadeInputDto = {
      id: 'Invoice id'
    }
    const result: FindInvoiceFacadeOutputDto =
      await facade.findInvoice(input)

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
    expect(result.createdAt.toString()).toEqual(
      createdAt.toString()
    )
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

    const facade = InvoiceFacadeFactory.create()
    const results: FindAllInvoiceFacadeOutputDto =
      await facade.findAllInvoices()
    const result = results.invoices[0]

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
    expect(result.createdAt).toStrictEqual(
      createdAt
    )
  })
})
