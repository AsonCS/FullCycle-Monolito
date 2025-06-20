import {
  Column,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

@Table({
  tableName: 'client',
  timestamps: false
})
export default class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  email: string

  @Column
  document: string

  @Column({ allowNull: false })
  street: string

  @Column({ allowNull: false })
  number: string

  @Column({ allowNull: true })
  complement: string

  @Column({ allowNull: false })
  city: string

  @Column({ allowNull: false })
  state: string

  @Column({ allowNull: false })
  zipcode: string

  @Column
  createdAt: Date

  @Column
  updatedAt: Date
}
