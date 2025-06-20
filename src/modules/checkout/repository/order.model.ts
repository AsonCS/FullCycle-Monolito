import {
  BelongsTo,
  Column,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import { CheckoutProductFields } from './product.model'
import { CheckoutClientFields } from './client.model'
import ClientModel from '../../@shared/repository/client.model'
import ProductModel from '../../@shared/repository/product.model'

export interface OrderFields {
  id: string
  client?: CheckoutClientFields
  products?: CheckoutProductFields[]
  status: string
}

@Table({
  tableName: 'orders',
  timestamps: false
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @BelongsTo(() => ClientModel, 'clientId')
  client: ClientModel

  @HasMany(() => ProductModel, 'orderId')
  products: ProductModel[]

  @Column({ allowNull: false })
  status: string

  get clientFields(): CheckoutClientFields {
    return this.client
  }

  get productsFields(): CheckoutProductFields[] {
    return this.products
  }
}
