import Address from '../../../@shared/domain/value-object/address'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Invoice from '../../domain/invoice'
import InvoiceItem from '../../domain/invoice-item'
import {
  FindInvoiceUseCaseInputDto,
  FindInvoiceUseCaseOutputDto
} from './find-invoice.dto'
import FindInvoiceUseCase from './find-invoice.usecase'

describe('Find invoice usecase unit test', () => {
  it('should find an invoice', async () => {
    const date = new Date()
    const usecase = new FindInvoiceUseCase({
      add() {
        throw new Error('Method not implemented.')
      },
      async find(id) {
        expect(id).toBe('Invoice id')

        return new Invoice({
          id: new Id(id),
          name: 'Invoice name',
          document: 'Invoice document',
          address: Address.newInstance({
            street: 'Address street',
            number: 'Address street number',
            complement: 'Address complement',
            city: 'Address city',
            state: 'Address state',
            zipCode: 'Address zip code'
          }),
          items: [
            new InvoiceItem({
              id: 'Item 1',
              name: 'Item name',
              price: 100
            }),
            new InvoiceItem({
              id: 'Item 2',
              name: 'Item name 2',
              price: 200
            })
          ],
          createdAt: date,
          updatedAt: date
        })
      },
      findAll() {
        throw new Error('Method not implemented.')
      }
    })
    const input: FindInvoiceUseCaseInputDto = {
      id: 'Invoice id'
    }

    const result: FindInvoiceUseCaseOutputDto =
      await usecase.execute(input)

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
    expect(result.createdAt).toBe(date)
  })
})
