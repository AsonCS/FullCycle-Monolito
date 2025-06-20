import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ClientGateway from '../../gateway/client.gateway'
import { FindAllClientUseCaseOutputDto } from './find-all-client.usecase.dto'

export default class FindAllClientUseCase
  implements UseCaseInterface
{
  private _clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository
  }

  async execute(): Promise<
    FindAllClientUseCaseOutputDto[]
  > {
    const results =
      await this._clientRepository.findAll()
    return results.map((result) => ({
      id: result.id.id,
      name: result.name,
      email: result.email,
      document: result.document,
      address: {
        street: result.address.street,
        number: result.address.number,
        complement: result.address.complement,
        city: result.address.city,
        state: result.address.state,
        zipCode: result.address.zipCode
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }))
  }
}
