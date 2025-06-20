import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import InvoiceItemModel from './invoice-item.model'

@Table({
  tableName: 'invoices',
  timestamps: false
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @HasMany(() => InvoiceItemModel)
  items: InvoiceItemModel[]

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  document: string

  @Column({ allowNull: false })
  street: string

  @Column({ allowNull: false })
  number: string

  @Column({ allowNull: false })
  complement: string

  @Column({ allowNull: false })
  city: string

  @Column({ allowNull: false })
  state: string

  @Column({ allowNull: false })
  zipCode: string

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}
