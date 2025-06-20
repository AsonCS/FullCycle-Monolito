import Address from '../../../@shared/domain/value-object/address'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import Order from '../../domain/order.entity'
import Product from '../../domain/product.entity'
import FindAllOrderUseCase from './find-all-order.usecase'

describe('FindAll orders usecase unit test', () => {
  it('should find all orders', async () => {
    const usecase = new FindAllOrderUseCase({
      add() {
        throw new Error('Method not implemented.')
      },
      async findAll() {
        return [
          new Order({
            id: new Id('Order id'),
            client: new Client({
              id: new Id('Client id'),
              name: 'Client name',
              email: 'Client email',
              address: Address.newInstance({
                street: 'Address street',
                number: 'Address street number',
                complement: 'Address complement',
                city: 'Address city',
                state: 'Address state',
                zipCode: 'Address zip code'
              })
            }),
            products: [
              new Product({
                id: new Id('Product 1'),
                name: 'Product name 1',
                description:
                  'Product description 1',
                salesPrice: 100
              }),
              new Product({
                id: new Id('Product 2'),
                name: 'Product name 2',
                description:
                  'Product description 2',
                salesPrice: 200
              })
            ]
          })
        ]
      }
    })

    const results = await usecase.execute()
    const result = results[0]

    expect(result.id).toBe('Order id')
    expect(result.client.id).toBe('Client id')
    expect(result.client.name).toBe('Client name')
    expect(result.client.email).toBe(
      'Client email'
    )
    expect(result.client.address.street).toBe(
      'Address street'
    )
    expect(result.client.address.number).toBe(
      'Address street number'
    )
    expect(result.client.address.complement).toBe(
      'Address complement'
    )
    expect(result.client.address.city).toBe(
      'Address city'
    )
    expect(result.client.address.state).toBe(
      'Address state'
    )
    expect(result.client.address.zipCode).toBe(
      'Address zip code'
    )
    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toBe('Product 1')
    expect(result.products[0].name).toBe(
      'Product name 1'
    )
    expect(result.products[0].description).toBe(
      'Product description 1'
    )
    expect(result.products[0].salesPrice).toBe(
      100
    )
    expect(result.products[1].id).toBe('Product 2')
    expect(result.products[1].name).toBe(
      'Product name 2'
    )
    expect(result.products[1].description).toBe(
      'Product description 2'
    )
    expect(result.products[1].salesPrice).toBe(
      200
    )
    expect(result.status).toBe('pending')
  })
})
