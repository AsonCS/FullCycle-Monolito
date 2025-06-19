import { GenerateInvoiceUseCaseInputDto } from './generate-invoice.dto'
import GenerateInvoiceUseCase from './generate-invoice.usecase'

describe('Generate invoice usecase unit test', () => {
  it('should generate a invoice', async () => {
    const usecase = new GenerateInvoiceUseCase({
      async add(invoice) {
        expect(invoice.name).toBe('Invoice name')
        expect(invoice.document).toBe(
          'Invoice document'
        )
        expect(invoice.address.street).toBe(
          'Address street'
        )
        expect(invoice.address.number).toBe(
          'Address street number'
        )
        expect(invoice.address.complement).toBe(
          'Address complement'
        )
        expect(invoice.address.city).toBe(
          'Address city'
        )
        expect(invoice.address.state).toBe(
          'Address state'
        )
        expect(invoice.address.zipCode).toBe(
          'Address zip code'
        )
        expect(invoice.items.length).toBe(2)
        expect(invoice.items[0].id).toBe('Item 1')
        expect(invoice.items[0].name).toBe(
          'Item name'
        )
        expect(invoice.items[0].price).toBe(100)
        expect(invoice.items[1].id).toBe('Item 2')
        expect(invoice.items[1].name).toBe(
          'Item name 2'
        )
        expect(invoice.items[1].price).toBe(200)
        expect(invoice.total).toBe(300)
      },
      find() {
        throw new Error('Method not implemented.')
      }
    })

    const input: GenerateInvoiceUseCaseInputDto =
      {
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

    const result = await usecase.execute(input)

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
  })
})
