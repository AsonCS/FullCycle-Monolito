import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from './product-adm.facade.interface'

export interface UseCasesProps {
  addUseCase: UseCaseInterface
  stockUseCase: UseCaseInterface
}

export default class ProductAdmFacade
  implements ProductAdmFacadeInterface
{
  private _addUsecase: UseCaseInterface
  private _checkStockUsecase: UseCaseInterface

  constructor(props: UseCasesProps) {
    this._addUsecase = props.addUseCase
    this._checkStockUsecase = props.stockUseCase
  }

  addProduct(
    input: AddProductFacadeInputDto
  ): Promise<void> {
    if (!input.name) {
      throw new Error('Name is required')
    }
    if (!input.description) {
      throw new Error('Description is required')
    }
    if (!input.purchasePrice) {
      throw new Error('PurchasePrice is required')
    }
    if (!input.stock) {
      throw new Error('Stock is required')
    }
    // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
    return this._addUsecase.execute(input)
  }
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input)
  }
}
