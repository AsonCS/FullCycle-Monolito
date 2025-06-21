import Address from '../../../@shared/domain/value-object/address'
import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface'
import InvoiceFacadeInterface from '../../../invoice/facade/invoice.facade.interface'
import PaymentFacadeInterface from '../../../payment/facade/facade.interface'
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface'
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface'
import Client from '../../domain/client.entity'
import Order from '../../domain/order.entity'
import Product from '../../domain/product.entity'
import CheckoutGateway from '../../gateway/checkout.gateway'
import {
  PlaceOrderInputDto,
  PlaceOrderOutputDto
} from './place-order.dto'

export type Props = {
  catalogFacade: StoreCatalogFacadeInterface
  clientFacade: ClientAdmFacadeInterface
  invoiceFacade: InvoiceFacadeInterface
  paymentFacade: PaymentFacadeInterface
  productFacade: ProductAdmFacadeInterface
  repository: CheckoutGateway
}

export default class PlaceOrderUseCase
  implements UseCaseInterface
{
  private _catalogFacade: StoreCatalogFacadeInterface
  private _clientFacade: ClientAdmFacadeInterface
  private _invoiceFacade: InvoiceFacadeInterface
  private _paymentFacade: PaymentFacadeInterface
  private _productFacade: ProductAdmFacadeInterface
  private _repository: CheckoutGateway

  constructor(props: Props) {
    this._catalogFacade = props.catalogFacade
    this._clientFacade = props.clientFacade
    this._invoiceFacade = props.invoiceFacade
    this._paymentFacade = props.paymentFacade
    this._productFacade = props.productFacade
    this._repository = props.repository
  }

  async execute(
    input: PlaceOrderInputDto
  ): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({
      id: input.clientId
    })
    if (!client) {
      throw new Error('Client not found')
    }

    await this.validateProducts(input)

    const products = await Promise.all(
      input.products.map((p) => {
        return this.getProduct(p.productId)
      })
    )

    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: Address.newInstance({
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement,
        city: client.address.city,
        state: client.address.state,
        zipCode: client.address.zipCode
      })
    })

    const order = new Order({
      client: myClient,
      products: products
    })

    const payment =
      await this._paymentFacade.process({
        orderId: order.id.id,
        amount: order.total
      })

    const invoice =
      payment.status === 'approved'
        ? await this._invoiceFacade.generateInvoice(
            {
              name: client.name,
              document: client.document,
              street: client.address.street,
              number: client.address.number,
              complement:
                client.address.complement,
              city: client.address.city,
              state: client.address.state,
              zipCode: client.address.zipCode,
              items: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                price: product.salesPrice
              }))
            }
          )
        : null

    payment.status === 'approved' &&
      order.approve()

    await this._repository.add(order)

    return {
      invoiceId: invoice ? invoice.id : null,
      orderId: order.id.id,
      status: order.status,
      products: order.products.map((product) => ({
        productId: product.id.id
      })),
      total: order.total
    }
  }

  private async validateProducts(
    input: PlaceOrderInputDto
  ) {
    if (input.products.length === 0) {
      throw new Error('No products selected')
    }

    for (const p of input.products) {
      const product =
        await this._productFacade.checkStock({
          productId: p.productId
        })
      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        )
      }
    }
  }

  private async getProduct(
    productId: string
  ): Promise<Product> {
    const product =
      await this._catalogFacade.find({
        id: productId
      })
    if (!product) {
      throw new Error('Product not found')
    }
    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
    const myProduct = new Product(productProps)
    return myProduct
  }
}
