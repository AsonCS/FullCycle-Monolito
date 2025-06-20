import Address from '../../@shared/domain/value-object/address'
import Id from '../../@shared/domain/value-object/id.value-object'
import Invoice from '../domain/invoice'
import InvoiceItem from '../domain/invoice-item'
import InvoiceGateway from '../gateway/invoice-gateway'
import InvoiceItemModel from './invoice-item.model'
import InvoiceModel from './invoice.model'

export default class InvoiceRepository
  implements InvoiceGateway
{
  async add(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price
        })),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        include: [InvoiceItemModel]
      }
    )
  }

  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemModel]
    })
    if (!invoice) {
      throw new Error(
        `Invoice with id ${id} not found`
      )
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: Address.newInstance({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode
      }),
      items: invoice.items.map(
        (item) =>
          new InvoiceItem({
            id: item.id,
            name: item.name,
            price: item.price
          })
      ),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    })
  }

  async findAll(): Promise<Invoice[]> {
    const invoices = await InvoiceModel.findAll({
      include: [InvoiceItemModel]
    })

    return invoices.map(
      (invoice) =>
        new Invoice({
          id: new Id(invoice.id),
          name: invoice.name,
          document: invoice.document,
          address: Address.newInstance({
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode
          }),
          items: invoice.items.map(
            (item) =>
              new InvoiceItem({
                id: item.id,
                name: item.name,
                price: item.price
              })
          ),
          createdAt: invoice.createdAt,
          updatedAt: invoice.updatedAt
        })
    )
  }
}
