import {
  Column,
  Model,
  PrimaryKey,
  Sequelize,
  Table
} from 'sequelize-typescript'

import { ClientModel } from '../modules/client-adm/repository/client.model'
import { InvoiceModel } from '../modules/invoice/repository/invoice.model'
import InvoiceItemModel from '../modules/invoice/repository/invoice-item.model'
import TransactionModel from '../modules/payment/repository/transaction.model'
import ProductModel from '../modules/@shared/repository/product.model'

export let sequelize: Sequelize

export async function setupDb() {
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
    ProductModel
  ])
  await sequelize.sync()
}
