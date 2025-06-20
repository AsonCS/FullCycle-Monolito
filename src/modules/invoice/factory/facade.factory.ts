import InvoiceFacade from '../facade/invoice.facade'
import InvoiceFacadeInterface from '../facade/invoice.facade.interface'
import InvoiceRepository from '../repository/invoice-repository'
import FindAllInvoiceUseCase from '../usecase/find-all-invoice/find-all-invoice.usecase'
import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase'
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase'

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepository()
    const findUseCase = new FindInvoiceUseCase(
      repository
    )
    const findAllUseCase =
      new FindAllInvoiceUseCase(repository)
    const generateUseCase =
      new GenerateInvoiceUseCase(repository)
    const facade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUseCase: findUseCase,
      findAllUseCase: findAllUseCase
    })

    return facade
  }
}
