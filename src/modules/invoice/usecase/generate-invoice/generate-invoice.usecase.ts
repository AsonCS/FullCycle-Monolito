import Address from '../../../@shared/domain/value-object/address'
import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import Invoice from '../../domain/invoice'
import InvoiceItem from '../../domain/invoice-item'
import InvoiceGateway from '../../gateway/invoice-gateway'
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto
} from './generate-invoice.dto'

export default class GenerateInvoiceUseCase
  implements UseCaseInterface
{
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }
  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: Address.newInstance({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode
      }),
      items: input.items.map(
        (item) =>
          new InvoiceItem({
            id: item.id,
            name: item.name,
            price: item.price
          })
      ),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await this._invoiceRepository.generate(
      invoice
    )

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items,
      total: invoice.total
    }
  }
}
