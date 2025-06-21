import { Sequelize } from 'sequelize-typescript'
import Id from '../../@shared/domain/value-object/id.value-object'
import Product, {
  ProductProps
} from '../domain/product.entity'
import ProductRepository from './product.repository'
import {
  AdmProductFields,
  AdmProductModel
} from './product.model'

describe('ProductRepository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([AdmProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productProps: ProductProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      salesPrice: 100,
      stock: 10
    }
    const product = new Product(productProps)
    const productRepository =
      new ProductRepository()
    await productRepository.add(product)

    const productDb: AdmProductFields =
      await AdmProductModel.findOne({
        where: { id: productProps.id.id }
      })

    expect(productProps.id.id).toEqual(
      productDb.id
    )
    expect(productProps.name).toEqual(
      productDb.name
    )
    expect(productProps.description).toEqual(
      productDb.description
    )
    expect(productProps.purchasePrice).toEqual(
      productDb.purchasePrice
    )
    expect(productProps.stock).toEqual(
      productDb.stock
    )
  })

  it('should find a product', async () => {
    const productRepository =
      new ProductRepository()

    const input: AdmProductFields = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      salesPrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    AdmProductModel.create({
      ...input
    })

    const product = await productRepository.find(
      '1'
    )

    expect(product.id.id).toEqual('1')
    expect(product.name).toEqual('Product 1')
    expect(product.description).toEqual(
      'Product 1 description'
    )
    expect(product.purchasePrice).toEqual(100)
    expect(product.stock).toEqual(10)
  })

  it('should find all products', async () => {
    const productRepository =
      new ProductRepository()

    const input: AdmProductFields = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      salesPrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await AdmProductModel.create({
      ...input
    })

    const products =
      await productRepository.findAll()
    const product = products[0]

    expect(product.id.id).toEqual('1')
    expect(product.name).toEqual('Product 1')
    expect(product.description).toEqual(
      'Product 1 description'
    )
    expect(product.purchasePrice).toEqual(100)
    expect(product.stock).toEqual(10)
  })
})
