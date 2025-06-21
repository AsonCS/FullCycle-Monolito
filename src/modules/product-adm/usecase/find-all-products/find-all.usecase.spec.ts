import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import { FindAllOutputDto } from './find-all-products.dto'
import FindAllUseCase from './find-all.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product',
  description: 'Product description',
  purchasePrice: 100,
  salesPrice: 100,
  stock: 10
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([product]))
  }
}

describe('FindAll usecase unit test', () => {
  it('should get all products', async () => {
    const ProductRepository = MockRepository()
    const useCase = new FindAllUseCase(
      ProductRepository
    )

    const result: FindAllOutputDto[] =
      await useCase.execute()

    expect(
      ProductRepository.findAll
    ).toHaveBeenCalled()
    expect(result[0].id).toBe('1')
    expect(result[0].name).toBe('Product')
    expect(result[0].description).toBe(
      'Product description'
    )
    expect(result[0].purchasePrice).toBe(100)
    expect(result[0].stock).toBe(10)
  })
})
