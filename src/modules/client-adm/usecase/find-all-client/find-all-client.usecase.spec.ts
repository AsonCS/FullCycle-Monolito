import Address from '../../../@shared/domain/value-object/address'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import FindAllClientUseCase from './find-all-client.usecase'
import { FindAllClientUseCaseOutputDto } from './find-all-client.usecase.dto'

const client = new Client({
  id: new Id('1'),
  name: 'Lucian',
  email: 'lucian@123.com',
  document: '1234-5678',
  address: new Address(
    'Rua 123',
    '99',
    'Casa Verde',
    'Criciúma',
    'SC',
    '88888-888'
  )
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([client]))
  }
}

describe('FindAll Clients use case unit test', () => {
  it('should find all clients', async () => {
    const repository = MockRepository()
    const usecase = new FindAllClientUseCase(
      repository
    )

    const result: FindAllClientUseCaseOutputDto[] =
      await usecase.execute()

    expect(repository.findAll).toHaveBeenCalled()
    expect(result[0].id).toEqual(client.id.id)
    expect(result[0].name).toEqual(client.name)
    expect(result[0].email).toEqual(client.email)
    expect(result[0].address.street).toEqual(
      client.address.street
    )
    expect(result[0].address.number).toEqual(
      client.address.number
    )
    expect(result[0].address.complement).toEqual(
      client.address.complement
    )
    expect(result[0].address.city).toEqual(
      client.address.city
    )
    expect(result[0].address.state).toEqual(
      client.address.state
    )
    expect(result[0].address.zipCode).toEqual(
      client.address.zipCode
    )
    expect(result[0].createdAt).toEqual(
      client.createdAt
    )
    expect(result[0].updatedAt).toEqual(
      client.updatedAt
    )
  })
})
