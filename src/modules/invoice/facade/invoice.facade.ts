import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from './invoice.facade.interface'

type Props = {
  generateUseCase: UseCaseInterface
  findUseCase: UseCaseInterface
}

export default class InvoiceFacade
  implements InvoiceFacadeInterface
{
  private _generateUseCase: UseCaseInterface
  private _findUseCase: UseCaseInterface

  constructor(props: Props) {
    this._generateUseCase = props.generateUseCase
    this._findUseCase = props.findUseCase
  }

  generateInvoice(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateUseCase.execute(input)
  }
  findInvoice(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUseCase.execute(input)
  }
}
