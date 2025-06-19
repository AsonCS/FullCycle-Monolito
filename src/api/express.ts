import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../modules/client-adm/repository/client.model'
import { InvoiceModel } from '../modules/invoice/repository/invoice.model'
import InvoiceItemModel from '../modules/invoice/repository/invoice-item.model'
import TransactionModel from '../modules/payment/repository/transaction.model'
import { ProductModel as ProductAdmModel } from '../modules/product-adm/repository/product.model'
import ProductStoreCatalogModel from '../modules/store-catalog/repository/product.model'
import { productsRoute } from './routes/products/products.route'
import { checkoutRoute } from './routes/checkout.route'
import { clientsRoute } from './routes/clients.route'
import { invoiceRoute } from './routes/invoice.route'

export const app: Express = express()
app.use(express.json())
app.use('/checkout', checkoutRoute)
app.use('/clients', clientsRoute)
app.use('/invoice', invoiceRoute)
app.use('/products', productsRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sqlite.db',
    logging: false
  })
  await sequelize.addModels([
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
    TransactionModel,
    ProductAdmModel,
    ProductStoreCatalogModel
  ])
  await sequelize.sync()
}
setupDb()
