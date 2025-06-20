import {
  Column,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

@Table({
  tableName: 'products',
  timestamps: false
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  //@ForeignKey(() => InvoiceModel)
  @Column
  orderId: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  description: string

  @Column
  purchasePrice: number

  @Column
  salesPrice: number

  @Column
  stock: number

  @Column
  createdAt: Date

  @Column
  updatedAt: Date
}
