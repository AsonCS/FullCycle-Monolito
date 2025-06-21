import { Sequelize } from 'sequelize-typescript'
import ProductAdmFacadeFactory from '../factory/facade.factory'
import {
  AdmProductFields,
  AdmProductModel
} from '../repository/product.model'
import {
  AddProductFacadeInputDto,
  FindAllFacadeOutputDto
} from './product-adm.facade.interface'

describe('ProductAdmFacade test', () => {
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
    // const productRepository = new ProductRepository();
    // const addProductUseCase = new AddProductUseCase(productRepository);
    // const productFacade = new ProductAdmFacade({
    //   addUseCase: addProductUseCase,
    //   stockUseCase: undefined,
    // });

    const productFacade =
      ProductAdmFacadeFactory.create()

    const input: AddProductFacadeInputDto = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      salesPrice: 10,
      stock: 10
    }

    await productFacade.addProduct(input)

    const product: AdmProductFields =
      await AdmProductModel.findOne({
        where: { id: '1' }
      })
    expect(product).toBeDefined()
    expect(product.id).toBe(input.id)
    expect(product.name).toBe(input.name)
    expect(product.description).toBe(
      input.description
    )
    expect(product.purchasePrice).toBe(
      input.purchasePrice
    )
    expect(product.stock).toBe(input.stock)
  })

  it('should check product stock', async () => {
    const productFacade =
      ProductAdmFacadeFactory.create()
    const input: AddProductFacadeInputDto = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      salesPrice: 10,
      stock: 10
    }
    await productFacade.addProduct(input)

    const result = await productFacade.checkStock(
      { productId: '1' }
    )

    expect(result.productId).toBe(input.id)
    expect(result.stock).toBe(input.stock)
  })

  it('should find all products stock', async () => {
    const productFacade =
      ProductAdmFacadeFactory.create()
    const input: AddProductFacadeInputDto = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      salesPrice: 10,
      stock: 10
    }
    await productFacade.addProduct(input)

    const result: FindAllFacadeOutputDto[] =
      await productFacade.findAll()

    expect(result[0].id).toBe(input.id)
    expect(result[0].name).toBe(input.name)
    expect(result[0].description).toBe(
      input.description
    )
    expect(result[0].purchasePrice).toBe(
      input.purchasePrice
    )
    expect(result[0].stock).toBe(input.stock)
  })
})
