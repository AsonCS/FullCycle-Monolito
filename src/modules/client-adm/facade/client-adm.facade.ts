import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindAllClientFacadeOutputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto
} from './client-adm.facade.interface'

export interface UseCaseProps {
  findUsecase: UseCaseInterface
  findAllUsecase: UseCaseInterface
  addUsecase: UseCaseInterface
}

export default class ClientAdmFacade
  implements ClientAdmFacadeInterface
{
  private _findUsecase: UseCaseInterface
  private _findAllUsecase: UseCaseInterface
  private _addUsecase: UseCaseInterface

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase
    this._findAllUsecase =
      usecaseProps.findAllUsecase
    this._addUsecase = usecaseProps.addUsecase
  }

  async add(
    input: AddClientFacadeInputDto
  ): Promise<void> {
    if (!input.name) {
      throw new Error('Name is required')
    }
    if (!input.email) {
      throw new Error('Email is required')
    }
    if (!input.document) {
      throw new Error('Document is required')
    }
    if (!input.address.street) {
      throw new Error(
        'Address street is required'
      )
    }
    if (!input.address.number) {
      throw new Error(
        'Address number is required'
      )
    }
    if (!input.address.complement) {
      throw new Error(
        'Address complement is required'
      )
    }
    if (!input.address.city) {
      throw new Error('Address city is required')
    }
    if (!input.address.state) {
      throw new Error('Address state is required')
    }
    if (!input.address.zipCode) {
      throw new Error(
        'Address zipCode is required'
      )
    }
    await this._addUsecase.execute(input)
  }

  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUsecase.execute(input)
  }

  async findAll(): Promise<FindAllClientFacadeOutputDto> {
    return await this._findAllUsecase.execute()
  }
}
