import { Sequelize } from 'sequelize-typescript'
import { AdmClientModel } from '../repository/client.model'
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory'
import Address from '../../@shared/domain/value-object/address'
import { FindAllClientFacadeOutputDto } from './client-adm.facade.interface'

describe('Client Adm Facade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([AdmClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    // const repository = new ClientRepository()
    // const addUsecase = new AddClientUseCase(
    //   repository
    // )
    // const facade = new ClientAdmFacade({
    //   addUsecase: addUsecase,
    //   findUsecase: undefined
    // })

    const facade = ClientAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Lucian',
      email: 'lucian@xpto.com',
      document: '1234-5678',
      address: new Address(
        'Rua 123',
        '99',
        'Casa Verde',
        'Criciúma',
        'SC',
        '88888-888'
      )
    }

    await facade.add(input)

    const client = await AdmClientModel.findOne({
      where: { id: '1' }
    })

    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.document).toBe(input.document)
    expect(client.street).toBe(
      input.address.street
    )
  })

  it('should find a client', async () => {
    // const repository = new ClientRepository()
    // const addUsecase = new AddClientUseCase(repository)
    // const findUseCase = new FindClientUseCase(repository)
    // const facade = new ClientAdmFacade({
    //   addUseCase: addUsecase,
    //   findUseCase: findUseCase
    // })

    const facade = ClientAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Lucian',
      email: 'lucian@xpto.com',
      document: '1234-5678',
      address: new Address(
        'Rua 123',
        '99',
        'Casa Verde',
        'Criciúma',
        'SC',
        '88888-888'
      )
    }

    await facade.add(input)

    const client = await facade.find({ id: '1' })

    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.document).toBe(input.document)
    expect(client.address.street).toBe(
      input.address.street
    )
    expect(client.address.number).toBe(
      input.address.number
    )
    expect(client.address.complement).toBe(
      input.address.complement
    )
    expect(client.address.city).toBe(
      input.address.city
    )
    expect(client.address.state).toBe(
      input.address.state
    )
    expect(client.address.zipCode).toBe(
      input.address.zipCode
    )
  })

  it('should find all clients', async () => {
    // const repository = new ClientRepository()
    // const addUsecase = new AddClientUseCase(repository)
    // const findUseCase = new FindClientUseCase(repository)
    // const facade = new ClientAdmFacade({
    //   addUseCase: addUsecase,
    //   findUseCase: findUseCase
    // })

    const facade = ClientAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Lucian',
      email: 'lucian@xpto.com',
      document: '1234-5678',
      address: new Address(
        'Rua 123',
        '99',
        'Casa Verde',
        'Criciúma',
        'SC',
        '88888-888'
      )
    }

    await facade.add(input)

    const client: FindAllClientFacadeOutputDto[] =
      await facade.findAll()

    expect(client.length).toBe(1)
    expect(client[0].id).toBe(input.id)
    expect(client[0].name).toBe(input.name)
    expect(client[0].email).toBe(input.email)
    expect(client[0].document).toBe(
      input.document
    )
    expect(client[0].address.street).toBe(
      input.address.street
    )
    expect(client[0].address.number).toBe(
      input.address.number
    )
    expect(client[0].address.complement).toBe(
      input.address.complement
    )
    expect(client[0].address.city).toBe(
      input.address.city
    )
    expect(client[0].address.state).toBe(
      input.address.state
    )
    expect(client[0].address.zipCode).toBe(
      input.address.zipCode
    )
  })
})
