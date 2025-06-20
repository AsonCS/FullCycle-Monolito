import request from 'supertest'
import { app } from '../../express'
import { sequelize } from '../../sequelize'
import { ClientModel } from '../../../modules/client-adm/repository/client.model'
import {
  AddClientFacadeInputDto,
  FindAllClientFacadeOutputDto,
  FindClientFacadeOutputDto
} from '../../../modules/client-adm/facade/client-adm.facade.interface'
import Address from '../../../modules/@shared/domain/value-object/address'

describe('E2E test for client', () => {
  ;(() => {
    beforeEach(async () => {
      await sequelize.sync({ force: true })
    })

    afterAll(async () => {
      await sequelize.close()
    })
  })()

  it('should find a client', async () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    ClientModel.create({
      id: '1',
      name: 'Lucian',
      email: 'lucian@123.com',
      document: '1234-5678',
      street: 'Rua 123',
      number: '99',
      complement: 'Casa Verde',
      city: 'Criciúma',
      state: 'SC',
      zipcode: '88888-888',
      createdAt: createdAt,
      updatedAt: updatedAt
    })

    const response = await request(app).get(
      '/clients/1'
    )

    expect(response.status).toBe(200)

    const output: FindClientFacadeOutputDto =
      response.body

    expect(output.id).toBe('1')
    expect(output.name).toBe('Lucian')
    expect(output.email).toBe('lucian@123.com')
    expect(output.document).toBe('1234-5678')
    expect(output.address.street).toBe('Rua 123')
    expect(output.address.number).toBe('99')
    expect(output.address.complement).toBe(
      'Casa Verde'
    )
    expect(output.address.city).toBe('Criciúma')
    expect(output.address.state).toBe('SC')
    expect(output.address.zipCode).toBe(
      '88888-888'
    )
    expect(
      new Date(output.createdAt).toString()
    ).toBe(createdAt.toString())
    expect(
      new Date(output.updatedAt).toString()
    ).toBe(updatedAt.toString())
  })

  it('should find all clients', async () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    ClientModel.create({
      id: '1',
      name: 'Lucian',
      email: 'lucian@123.com',
      document: '1234-5678',
      street: 'Rua 123',
      number: '99',
      complement: 'Casa Verde',
      city: 'Criciúma',
      state: 'SC',
      zipcode: '88888-888',
      createdAt: createdAt,
      updatedAt: updatedAt
    })

    const response = await request(app).get(
      '/clients'
    )

    expect(response.status).toBe(200)

    const output: FindAllClientFacadeOutputDto =
      response.body

    expect(output.clients.length).toBe(1)
    expect(output.clients[0].id).toBe('1')
    expect(output.clients[0].name).toBe('Lucian')
    expect(output.clients[0].email).toBe(
      'lucian@123.com'
    )
    expect(output.clients[0].document).toBe(
      '1234-5678'
    )
    expect(output.clients[0].address.street).toBe(
      'Rua 123'
    )
    expect(output.clients[0].address.number).toBe(
      '99'
    )
    expect(
      output.clients[0].address.complement
    ).toBe('Casa Verde')
    expect(output.clients[0].address.city).toBe(
      'Criciúma'
    )
    expect(output.clients[0].address.state).toBe(
      'SC'
    )
    expect(
      output.clients[0].address.zipCode
    ).toBe('88888-888')
    expect(
      new Date(
        output.clients[0].createdAt
      ).toString()
    ).toBe(createdAt.toString())
    expect(
      new Date(
        output.clients[0].updatedAt
      ).toString()
    ).toBe(updatedAt.toString())
  })

  it('should create a client', async () => {
    const input: AddClientFacadeInputDto = {
      id: '1',
      name: 'Lucian',
      email: 'lucian@xpto.com',
      document: '1234-5678',
      address: {
        street: 'Rua 123',
        number: '99',
        complement: 'Casa Verde',
        city: 'Criciúma',
        state: 'SC',
        zipCode: '88888-888'
      }
    }
    const response = await request(app)
      .post('/clients')
      .send(input)

    expect(response.status).toBe(204)
    expect(response.body).toEqual({})

    const input2: AddClientFacadeInputDto = {
      name: 'Lucian',
      email: 'lucian@xpto.com',
      document: '1234-5678',
      address: {
        street: 'Rua 123',
        number: '99',
        complement: 'Casa Verde',
        city: 'Criciúma',
        state: 'SC',
        zipCode: '88888-888'
      }
    }
    const response2 = await request(app)
      .post('/clients')
      .send(input2)

    expect(response2.status).toBe(204)
    expect(response2.body).toEqual({})
  })

  it('should not create a client', async () => {
    let response = await request(app)
      .post('/clients')
      .send({
        email: 'lucian@xpto.com',
        document: '1234-5678',
        address: {
          street: 'Rua 123',
          number: '99',
          complement: 'Casa Verde',
          city: 'Criciúma',
          state: 'SC',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Name is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        document: '1234-5678',
        address: {
          street: 'Rua 123',
          number: '99',
          complement: 'Casa Verde',
          city: 'Criciúma',
          state: 'SC',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Email is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        email: 'lucian@xpto.com',
        address: {
          street: 'Rua 123',
          number: '99',
          complement: 'Casa Verde',
          city: 'Criciúma',
          state: 'SC',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Document is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        email: 'lucian@xpto.com',
        document: '1234-5678',
        address: {
          number: '99',
          complement: 'Casa Verde',
          city: 'Criciúma',
          state: 'SC',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address street is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        email: 'lucian@xpto.com',
        document: '1234-5678',
        address: {
          street: 'Rua 123',
          complement: 'Casa Verde',
          city: 'Criciúma',
          state: 'SC',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address number is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        email: 'lucian@xpto.com',
        document: '1234-5678',
        address: {
          street: 'Rua 123',
          number: '99',
          city: 'Criciúma',
          state: 'SC',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address complement is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        email: 'lucian@xpto.com',
        document: '1234-5678',
        address: {
          street: 'Rua 123',
          number: '99',
          complement: 'Casa Verde',
          state: 'SC',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address city is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        email: 'lucian@xpto.com',
        document: '1234-5678',
        address: {
          street: 'Rua 123',
          number: '99',
          complement: 'Casa Verde',
          city: 'Criciúma',
          zipCode: '88888-888'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address state is required'
    )

    response = await request(app)
      .post('/clients')
      .send({
        name: 'Lucian',
        email: 'lucian@xpto.com',
        document: '1234-5678',
        address: {
          street: 'Rua 123',
          number: '99',
          complement: 'Casa Verde',
          city: 'Criciúma',
          state: 'SC'
        }
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Address zipCode is required'
    )
  })
})
