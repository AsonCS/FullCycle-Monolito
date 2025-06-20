import request from 'supertest'
import { app } from '../../express'
import { sequelize } from '../../sequelize'
import {
  AdmProductFields,
  AdmProductModel
} from '../../../modules/product-adm/repository/product.model'
import { FindAllFacadeOutputDto } from '../../../modules/product-adm/facade/product-adm.facade.interface'

describe('E2E test for product', () => {
  ;(() => {
    beforeEach(async () => {
      await sequelize.sync({ force: true })
    })

    afterAll(async () => {
      await sequelize.close()
    })
  })()

  it('should find all products', async () => {
    const input: AdmProductFields = {
      id: '1',
      name: 'Chair',
      description: 'Description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    AdmProductModel.create({
      ...input
    })

    const input2: AdmProductFields = {
      id: '2',
      name: 'Chair 2',
      description: 'Description 2',
      purchasePrice: 200,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    AdmProductModel.create({
      ...input2
    })

    const response = await request(app).get(
      '/products'
    )

    expect(response.status).toBe(200)

    const output: FindAllFacadeOutputDto =
      response.body
    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(input.id)
    expect(output.products[0].name).toBe(
      input.name
    )
    expect(output.products[0].description).toBe(
      input.description
    )
    expect(output.products[0].purchasePrice).toBe(
      input.purchasePrice
    )
    expect(output.products[0].stock).toBe(
      input.stock
    )
    expect(output.products[1].id).toBe(input2.id)
    expect(output.products[1].name).toBe(
      input2.name
    )
    expect(output.products[1].description).toBe(
      input2.description
    )
    expect(output.products[1].purchasePrice).toBe(
      input2.purchasePrice
    )
    expect(output.products[1].stock).toBe(
      input2.stock
    )
  })

  it('should create a product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Chair',
        description: 'Description',
        purchasePrice: 100,
        stock: 10
      })

    expect(response.status).toBe(204)
    expect(response.body).toEqual({})
  })

  it('should not create a product', async () => {
    let response = await request(app)
      .post('/products')
      .send({
        description: 'Description',
        purchasePrice: 100,
        stock: 10
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Name is required'
    )

    response = await request(app)
      .post('/products')
      .send({
        name: 'Chair',
        purchasePrice: 100,
        stock: 10
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Description is required'
    )

    response = await request(app)
      .post('/products')
      .send({
        name: 'Chair',
        description: 'Description',
        stock: 10
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Purchase price is required'
    )

    response = await request(app)
      .post('/products')
      .send({
        name: 'Chair',
        description: 'Description',
        purchasePrice: 100
      })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Stock is required'
    )

    response = await request(app)
      .post('/products')
      .send({})

    expect(response.status).toBe(500)
    expect(response.body.error).toBe(
      'Name is required'
    )
  })
})
