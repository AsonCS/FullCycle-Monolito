import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import InvoiceGateway from '../../gateway/invoice-gateway'
import { FindAllInvoiceUseCaseOutputDto } from './find-all-invoice.dto'

export default class FindAllInvoiceUseCase
  implements UseCaseInterface
{
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(): Promise<
    FindAllInvoiceUseCaseOutputDto[]
  > {
    const invoices =
      await this._invoiceRepository.findAll()
    return invoices.map((invoice) => ({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode
      },
      items: invoice.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total,
      createdAt: invoice.createdAt
    }))
  }
}
