import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import {
  CheckoutFacadeInterface,
  FindAllCheckoutFacadeOutputDto,
  PlaceOrderCheckoutFacadeInputDto,
  PlaceOrderCheckoutFacadeOutputDto
} from './checkout.facade.interface'

type Props = {
  findAllUseCase: UseCaseInterface
  placeOrderUseCase: UseCaseInterface
}

export default class CheckoutFacade
  implements CheckoutFacadeInterface
{
  private _findAllUseCase: UseCaseInterface
  private _placeOrderUseCase: UseCaseInterface

  constructor(props: Props) {
    this._findAllUseCase = props.findAllUseCase
    this._placeOrderUseCase =
      props.placeOrderUseCase
  }

  findAll(): Promise<
    FindAllCheckoutFacadeOutputDto[]
  > {
    return this._findAllUseCase.execute()
  }
  placeOrder(
    input: PlaceOrderCheckoutFacadeInputDto
  ): Promise<PlaceOrderCheckoutFacadeOutputDto> {
    return this._placeOrderUseCase.execute(input)
  }
}
