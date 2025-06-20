import {
  Column,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import {
  CheckoutProductFields,
  CheckoutProductModel
} from './product.model'
import {
  CheckoutClientFields,
  CheckoutClientModel
} from './client.model'

export interface OrderFields {
  id: string
  client: CheckoutClientFields
  products: CheckoutProductFields[]
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

  @HasOne(() => CheckoutClientModel, 'orderId')
  client: CheckoutClientModel

  @HasMany(() => CheckoutProductModel, 'orderId')
  products: CheckoutProductModel[]

  @Column({ allowNull: false })
  status: string
}
