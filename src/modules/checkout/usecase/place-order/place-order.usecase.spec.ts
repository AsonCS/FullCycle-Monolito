import {
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto
} from '../../../client-adm/facade/client-adm.facade.interface'
import {
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from '../../../product-adm/facade/product-adm.facade.interface'
import {
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto
} from '../../../store-catalog/facade/store-catalog.facade.interface'
import Order from '../../domain/order.entity'
import PlaceOrderUseCase from './place-order.usecase'

describe('Place order usecase unit test', () => {
  it('should throw error when client not found', async () => {
    const usecase = useCase({
      clientFacadeFind: async () => null
    })

    expect(
      usecase.execute({
        clientId: 'Client id',
        products: []
      })
    ).rejects.toThrow(
      new Error('Client not found')
    )
  })

  it('should throw error when there are no products', async () => {
    const usecase = useCase()

    expect(
      usecase['validateProducts']({
        clientId: 'Client id',
        products: []
      })
    ).rejects.toThrow(
      new Error('No products selected')
    )
  })

  it('should throw error when the product is out of stock', async () => {
    const usecase = useCase({
      productFacadeCheckStock: async (input) =>
        ({
          productId: input.productId,
          stock: 0
        } as any)
    })

    expect(
      usecase['validateProducts']({
        clientId: 'Client id',
        products: [
          {
            productId: 'Product1'
          }
        ]
      })
    ).rejects.toThrow(
      new Error(
        'Product Product1 is not available in stock'
      )
    )
  })

  it('should validate the stock of the products', async () => {
    const usecase = useCase()

    usecase['validateProducts']({
      clientId: 'Client id',
      products: [
        {
          productId: 'Product2'
        }
      ]
    })
  })

  it('should throw error when the product is not found', async () => {
    const usecase = useCase({
      catalogFacadeFind: async () => null
    })

    expect(
      usecase['getProduct']('Product3')
    ).rejects.toThrow(
      new Error('Product not found')
    )
  })

  it('should return a product', async () => {
    const usecase = useCase()

    const result = await usecase['getProduct'](
      'Product4'
    )

    expect(result).toBeDefined()
    expect(result.id.id).toBe('Product4')
    expect(result.name).toBe('Product name')
    expect(result.description).toBe(
      'Product description'
    )
    expect(result.salesPrice).toBe(100)
  })

  it('should return an order', async () => {
    const usecase = useCase({
      repositoryAdd: async (order: Order) => {
        expect(order.client.id.id).toBe(
          'Client id'
        )
        expect(order.client.name).toBe(
          'Client name'
        )
        expect(order.client.email).toBe(
          'Client email'
        )
        expect(order.client.address.street).toBe(
          'Client street'
        )
        expect(order.client.address.number).toBe(
          'Client number'
        )
        expect(
          order.client.address.complement
        ).toBe('Client complement')
        expect(order.client.address.city).toBe(
          'Client city'
        )
        expect(order.client.address.state).toBe(
          'Client state'
        )
        expect(order.client.address.zipCode).toBe(
          'Client zip code'
        )
        expect(order.products[0].name).toBe(
          'Product name'
        )
        expect(
          order.products[0].description
        ).toBe('Product description')
        expect(order.products[0].salesPrice).toBe(
          100
        )
      }
    })

    const result = await usecase.execute({
      clientId: 'Client id',
      products: [
        {
          productId: 'Product5'
        }
      ]
    })

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.products).toBeDefined()
    expect(result.products.length).toBe(1)
    expect(result.products[0].productId).toBe(
      'Product5'
    )
    expect(result.total).toBe(100)
  })

  function useCase({
    catalogFacadeFind = async (input) => ({
      id: input.id,
      name: 'Product name',
      description: 'Product description',
      salesPrice: 100
    }),

    clientFacadeFind = async (input) => ({
      id: input.id,
      name: 'Client name',
      email: 'Client email',
      document: 'Client document',
      address: {
        street: 'Client street',
        number: 'Client number',
        complement: 'Client complement',
        city: 'Client city',
        state: 'Client state',
        zipCode: 'Client zip code'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }),

    productFacadeCheckStock = async (input) => ({
      productId: input.productId,
      stock: 10
    }),

    repositoryAdd = async (order: Order) => {}
  }: Props = {}): PlaceOrderUseCase {
    return new PlaceOrderUseCase({
      clientFacade: {
        add() {
          throw new Error(
            'Method not implemented.'
          )
        },
        find(input) {
          return clientFacadeFind(input)
        },
        findAll() {
          throw new Error(
            'Method not implemented.'
          )
        }
      },
      productFacade: {
        addProduct() {
          throw new Error(
            'Method not implemented.'
          )
        },
        checkStock(input) {
          return productFacadeCheckStock(input)
        },
        findAll() {
          throw new Error(
            'Method not implemented.'
          )
        }
      },
      catalogFacade: {
        find(input) {
          return catalogFacadeFind(input)
        },
        findAll() {
          throw new Error(
            'Method not implemented.'
          )
        }
      },
      repository: {
        add(order) {
          return repositoryAdd(order)
        },
        findAll() {
          throw new Error(
            'Method not implemented.'
          )
        }
      }
    })
  }

  type Props = {
    catalogFacadeFind?: (
      input: FindStoreCatalogFacadeInputDto
    ) => Promise<FindStoreCatalogFacadeOutputDto>

    clientFacadeFind?: (
      input: FindClientFacadeInputDto
    ) => Promise<FindClientFacadeOutputDto>

    productFacadeCheckStock?: (
      input: CheckStockFacadeInputDto
    ) => Promise<CheckStockFacadeOutputDto>

    repositoryAdd?: (
      order: Order
    ) => Promise<void>
  }
})
