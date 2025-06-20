import { Sequelize } from 'sequelize-typescript'

import ClientModel from '../modules/@shared/repository/client.model'
import InvoiceModel from '../modules/invoice/repository/invoice.model'
import InvoiceItemModel from '../modules/invoice/repository/invoice-item.model'
import TransactionModel from '../modules/payment/repository/transaction.model'
import ProductModel from '../modules/@shared/repository/product.model'

export let sequelize: Sequelize

export async function setupDb(
  storage: string = 'sqlite.db'
) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storage,
    logging: false
  })
  await sequelize.addModels([
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
    TransactionModel,
    ProductModel
  ])
  await sequelize.sync()
}
