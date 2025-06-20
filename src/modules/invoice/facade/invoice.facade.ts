import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import InvoiceFacadeInterface, {
  FindAllInvoiceFacadeOutputDto,
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from './invoice.facade.interface'

type Props = {
  generateUseCase: UseCaseInterface
  findUseCase: UseCaseInterface
  findAllUseCase: UseCaseInterface
}

export default class InvoiceFacade
  implements InvoiceFacadeInterface
{
  private _generateUseCase: UseCaseInterface
  private _findUseCase: UseCaseInterface
  private _findAllUseCase: UseCaseInterface

  constructor(props: Props) {
    this._generateUseCase = props.generateUseCase
    this._findUseCase = props.findUseCase
    this._findAllUseCase = props.findAllUseCase
  }

  generateInvoice(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    if (!input.name) {
      throw new Error('Name is required')
    }
    if (!input.document) {
      throw new Error('Document is required')
    }
    if (!input.street) {
      throw new Error(
        'Address street is required'
      )
    }
    if (!input.number) {
      throw new Error(
        'Address number is required'
      )
    }
    if (!input.complement) {
      throw new Error(
        'Address complement is required'
      )
    }
    if (!input.city) {
      throw new Error('Address city is required')
    }
    if (!input.state) {
      throw new Error('Address state is required')
    }
    if (!input.zipCode) {
      throw new Error(
        'Address zip code is required'
      )
    }
    if (
      !input.items ||
      input.items.length === 0
    ) {
      throw new Error('Items is required')
    }
    input.items.forEach((item) => {
      if (!item.id) {
        throw new Error('Item id is required')
      }
      if (!item.name) {
        throw new Error('Item name is required')
      }
      if (!item.price) {
        throw new Error('Item price is required')
      }
    })
    return this._generateUseCase.execute(input)
  }

  findInvoice(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUseCase.execute(input)
  }

  findAllInvoices(): Promise<
    FindAllInvoiceFacadeOutputDto[]
  > {
    return this._findAllUseCase.execute()
  }
}
